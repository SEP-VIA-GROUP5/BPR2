package com.rentit.services;

import com.rentit.dao.interfaces.IImageMapper;
import com.rentit.dao.interfaces.IProductMapper;
import com.rentit.model.PriceFilteringColumn;
import com.rentit.model.Product;
import com.rentit.model.User;
import com.rentit.model.dto.ProductDTO;
import com.rentit.model.dto.ProductPackageDTO;
import com.rentit.model.dto.UserDTO;
import com.rentit.model.enums.ProductStatus;
import com.rentit.services.enums.ResponseMessage;
import com.rentit.services.utils.ServiceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import static com.rentit.model.dto.ProductDTO.buildProductDTO;
import static com.rentit.model.dto.UserDTO.buildUserDTO;

@Service
public class ProductService {
    @Autowired
    private IProductMapper productMapper;
    @Autowired
    private IImageMapper imageMapper;

    @Autowired
    private UserService userService;

    private final ServiceUtils serviceUtils = ServiceUtils.getInstance();

    public List<ProductDTO> getNProductsByPage(int pageNum, int n) {
        if (pageNum > 0 && n > 0) {
            return productMapper.getNProductsByPage(pageNum, n);
        }
        return null;
    }

    public List<ProductDTO> getNProductsByPageWithFilters(int pageNum, int n, Map<String, String> filters) {
        if (pageNum > 0 && n > 0) {
            Map<PriceFilteringColumn, String> processedMap = serviceUtils.processFiltering(filters);
            return productMapper.getNProductsByPageWithFilters(pageNum, n, processedMap);
        }
        return null;
    }

    public ProductDTO addProduct(Product product, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);

        if (product == null) {
            return null;
        }

        if (product.getProductValue() < 0.01
                || (product.getName() == null || "".equals(product.getName()))
                || (product.getDescription() == null || "".equals(product.getDescription()))
                || product.getDayPrice() < 0.01) {
            return null;
        }

        if (product.getCategory() == null || "".equals(product.getCategory())) {
            product.setCategory("other");
        }

        if (product.getCity() == null || "".equals(product.getCity())) {
            product.setCity(user.getLocation());
        }

        product.setUserId(user.getId());
        product.setStatus(ProductStatus.AVAILABLE);

        productMapper.addProduct(product);
        imageMapper.addImages(product.getImages(), product.getId());

        return buildProductDTO(product);
    }

    public ProductPackageDTO getProductById(int productId) {
        if (productId <= 0) {
            return null;
        }

        Product product = productMapper.getProductById(productId);

        if (product.getUserId() <= 0) {
            return null;
        }

        User user = userService.getUserById(product.getUserId());

        ProductDTO productDTO = buildProductDTO(product);
        UserDTO userDTO = buildUserDTO(user);

        return ProductPackageDTO.builder().product(productDTO).user(userDTO).build();
    }

    public ResponseMessage deleteProductById(int productId, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);

        if (user == null || productId < 0) {
            return ResponseMessage.DELETION_ERROR;
        }

        Product productToBeDeleted = productMapper.getProductById(productId);

        if (productToBeDeleted.getUserId() == user.getId()) {
            productMapper.deleteProductById(productId);
            return ResponseMessage.SUCCESS;
        }

        return ResponseMessage.INTERNAL_ERROR;
    }

    public List<ProductDTO> getMyList(String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);
        return getProductListByUser(user);
    }

    public List<ProductDTO> getUserProductList(String email) {
        User user = userService.getUserFromEmail(email);
        return getProductListByUser(user);
    }

    private List<ProductDTO> getProductListByUser(User user) {
        if (user == null || user.getId() < 0) {
            return null;
        }
        return productMapper.getProductsByUserId(user.getId());
    }

    public int getProductOwnerId(int productId) {
        if (productId < 0) {
            return -1;
        }
        return productMapper.getProductOwnerId(productId);
    }

    public ResponseMessage setProductStatus(int id, String status, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, false);
        Product product = productMapper.getProductById(id);
        if(user == null || product.getUserId() != user.getId()){
            return ResponseMessage.CREDENTIALS_ERROR;
        }
        if(id < 0 && status.isEmpty()){
            return ResponseMessage.INVALID_PARAMETERS;
        }

        switch (status.toUpperCase()){
            case "AVAILABLE" -> productMapper.changeProductStatus(id, ProductStatus.AVAILABLE);
            case "RENTED" -> productMapper.changeProductStatus(id, ProductStatus.RENTED);
            case "PAUSED" -> productMapper.changeProductStatus(id, ProductStatus.PAUSED);
            case "UNAVAILABLE" -> productMapper.changeProductStatus(id, ProductStatus.UNAVAILABLE);
            default -> {
                return ResponseMessage.INVALID_PARAMETERS;
            }
        }
        return ResponseMessage.SUCCESS;
    }
}
