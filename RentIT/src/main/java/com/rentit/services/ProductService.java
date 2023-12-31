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
import com.rentit.utils.ServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    @Autowired
    private ServiceUtil serviceUtil;

    public List<ProductDTO> getNProductsByPage(int pageNum, int n) {
        if (pageNum > 0 && n > 0) {
            return productMapper.getNProductsByPage(pageNum, n);
        }
        return null;
    }

    public List<ProductDTO> getNProductsByPageWithFilters(int pageNum, int n, Map<String, String> filters) {
        if (pageNum > 0 && n > 0) {
            Map<PriceFilteringColumn, String> processedMap = serviceUtil.processFiltering(filters);
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
        if(product.getTags() != null && !product.getTags().isEmpty()){
            productMapper.addTags(product.getTags(), product.getId());
        }
        if(product.getImages() != null && !product.getImages().isEmpty()){
            imageMapper.addImages(product.getImages(), product.getId());
        }

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
            return ResponseMessage.INVALID_PARAMETERS;
        }

        Product productToBeDeleted = productMapper.getProductById(productId);

        if (productToBeDeleted.getUserId() == user.getId()) {
            productMapper.deleteProductById(productId);
            return ResponseMessage.SUCCESS;
        }
        else {
            return ResponseMessage.CREDENTIALS_ERROR;
        }
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

    public ResponseMessage setProductStatus(int id, String status, String authorizationHeader, String rentedUntil) {
        User user = userService.getUserFromToken(authorizationHeader, true);
        Product product = productMapper.getProductById(id);
        if(user == null || product.getUserId() != user.getId()){
            return ResponseMessage.CREDENTIALS_ERROR;
        }
        if(id < 0 && status.isEmpty()){
            return ResponseMessage.INVALID_PARAMETERS;
        }

        switch (status.toUpperCase()){
            case "AVAILABLE" -> {
                productMapper.changeProductStatus(id, ProductStatus.AVAILABLE);
                productMapper.setProductRentedUntilDate(id, null);
            }
            case "RENTED" -> {
                if(rentedUntil == null || "".equals(rentedUntil)){
                    return ResponseMessage.INVALID_PARAMETERS;
                }
                LocalDate rentedUntilLD = LocalDate.parse(rentedUntil);
                if(rentedUntilLD.isAfter(LocalDate.now())){
                    productMapper.setProductRentedUntilDate(id, rentedUntilLD);
                    productMapper.changeProductStatus(id, ProductStatus.RENTED);
                }
                else {
                    return ResponseMessage.INVALID_PARAMETERS;
                }
            }
            case "PAUSED" -> {
                productMapper.changeProductStatus(id, ProductStatus.PAUSED);
                productMapper.setProductRentedUntilDate(id, null);
            }
            case "UNAVAILABLE" -> {
                productMapper.changeProductStatus(id, ProductStatus.UNAVAILABLE);
                productMapper.setProductRentedUntilDate(id, null);
            }
            default -> {
                return ResponseMessage.INVALID_PARAMETERS;
            }
        }
        return ResponseMessage.SUCCESS;
    }

    public ProductDTO editProduct(Product product, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);
        if(user == null){
            return null;
        }
        Product retreivedProduct = productMapper.getProductById(product.getId());
        int productUserId = productMapper.getProductOwnerId(product.getId());
        if(user.getId() != productUserId) {
            return null;
        }

        retreivedProduct.setName((!product.getName().isEmpty()) ? product.getName() : retreivedProduct.getName());
        retreivedProduct.setDescription((!product.getDescription().isEmpty()) ? product.getDescription() : retreivedProduct.getDescription());
        retreivedProduct.setDayPrice((product.getDayPrice() > 0) ? product.getDayPrice() : retreivedProduct.getDayPrice());
        retreivedProduct.setWeekPrice((product.getWeekPrice() > 0) ? product.getWeekPrice() : retreivedProduct.getWeekPrice());
        retreivedProduct.setMonthPrice((product.getMonthPrice() > 0) ? product.getMonthPrice() : retreivedProduct.getMonthPrice());
        retreivedProduct.setDeposit((product.getDeposit() > 0) ? product.getDeposit() : retreivedProduct.getDeposit());
        retreivedProduct.setCity((!product.getCity().isEmpty()) ? product.getCity() : retreivedProduct.getCity());
        retreivedProduct.setProductValue((product.getProductValue() > 0) ? product.getProductValue() : retreivedProduct.getProductValue());
        retreivedProduct.setMinLeasePeriod((product.getMinLeasePeriod() > 0) ? product.getMinLeasePeriod() : retreivedProduct.getMinLeasePeriod());
        retreivedProduct.setCategory((!product.getCategory().isEmpty()) ? product.getCategory() : retreivedProduct.getCategory());
        retreivedProduct.setTags((!product.getTags().isEmpty()) ? product.getTags() : retreivedProduct.getTags());
        retreivedProduct.setImages((!product.getImages().isEmpty()) ? product.getImages() : retreivedProduct.getImages());

        imageMapper.deleteImagesByProductId(retreivedProduct.getId());
        imageMapper.addImages(retreivedProduct.getImages(), retreivedProduct.getId());
        productMapper.deleteTags(retreivedProduct.getId());
        productMapper.updateProduct(retreivedProduct);
        productMapper.addTags(retreivedProduct.getTags(), retreivedProduct.getId());
        return ProductDTO.buildProductDTO(retreivedProduct);
    }
}
