package com.rentit.services;

import com.rentit.dao.interfaces.IImageMapper;
import com.rentit.dao.interfaces.IProductMapper;
import com.rentit.model.Product;
import com.rentit.model.User;
import com.rentit.model.dto.ProductDTO;
import com.rentit.model.dto.ProductPackageDTO;
import com.rentit.model.dto.UserDTO;
import com.rentit.model.enums.ProductStatus;
import com.rentit.services.enums.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private IProductMapper productMapper;
    @Autowired
    private IImageMapper imageMapper;

    @Autowired
    private UserService userService;

    public List<ProductDTO> getNProductsByPage(int pageNum, int n) {
        if (pageNum > 0 && n > 0) {
            return productMapper.getNProductsByPage(pageNum, n);
        }
        return null;
    }

    public List<ProductDTO> getNProductsByPageWithFilter(int pageNum, int n, String filter, String property) {
        if(pageNum > 0 && n > 0 && !filter.isEmpty()){
            switch (filter){
                case "location" -> {
                    return getNProductsByPageWithLocationFilter(pageNum, n, property);
                }
                default -> {
                    return null;
                }
            }
        }
        return null;
    }

    private List<ProductDTO> getNProductsByPageWithLocationFilter(int pageNum, int n, String location){
        return productMapper.getNProductsByPageByLocation(pageNum, n, location);
    }

    public ProductDTO addProduct(Product product, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);

        if(product == null){
            return null;
        }

        if(product.getProductValue() < 0.01
            || (product.getName() == null || "".equals(product.getName()))
            || (product.getDescription() == null || "".equals(product.getDescription()))
            || product.getDayPrice() < 0.01){
            return null;
        }

        if(product.getCategory() == null || "".equals(product.getCategory())){
            product.setCategory("other");
        }

        if(product.getCity() == null || "".equals(product.getCity())){
            product.setCity(user.getLocation());
        }

        product.setUserId(user.getId());
        product.setStatus(ProductStatus.AVAILABLE);

        productMapper.addProduct(product);
        imageMapper.addImages(product.getImages(), product.getId());

        return buildProductDTO(product);
    }

    public ProductPackageDTO getProductById(int productId) {
        if(productId <= 0){
            return null;
        }

        Product product = productMapper.getProductById(productId);

        if(product.getUserId() <= 0){
            return null;
        }

        User user = userService.getUserById(product.getUserId());

        ProductDTO productDTO = buildProductDTO(product);
        UserDTO userDTO = UserService.buildUserDTO(user);

        return ProductPackageDTO.builder().product(productDTO).user(userDTO).build();
    }

    public ResponseMessage deleteProductById(int productId, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);

        if(user == null || productId < 0) {
            return ResponseMessage.DELETION_ERROR;
        }

        Product productToBeDeleted = productMapper.getProductById(productId);

        if(productToBeDeleted.getUserId() == user.getId()) {
            productMapper.deleteProductById(productId);
            return ResponseMessage.SUCCESS;
        }

        return ResponseMessage.INTERNAL_ERROR;
    }

    public static ProductDTO buildProductDTO(Product product){
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .dayPrice(product.getDayPrice())
                .weekPrice(product.getWeekPrice())
                .monthPrice(product.getMonthPrice())
                .deposit(product.getDeposit())
                .city(product.getCity())
                .productValue(product.getProductValue())
                .minLeasePeriod(product.getMinLeasePeriod())
                .category(product.getCategory())
                .tags(product.getTags())
                .images(product.getImages())
                .status(product.getStatus())
                .rentedUntil(product.getRentedUntil())
                .build();
    }
}
