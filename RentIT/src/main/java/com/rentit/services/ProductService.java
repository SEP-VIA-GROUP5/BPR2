package com.rentit.services;

import com.rentit.dao.interfaces.IImageMapper;
import com.rentit.dao.interfaces.IProductMapper;
import com.rentit.model.Product;
import com.rentit.model.User;
import com.rentit.model.enums.ProductStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private IProductMapper productMapper;
    @Autowired
    IImageMapper imageMapper;

    @Autowired
    private UserService userService;

    public List<Product> getNProductsByPage(int pageNum, int n) {
        if (pageNum > 0 && n > 0) {
            return productMapper.getNProductsByPage(pageNum, n);
        }
        return null;
    }

    public Product addProduct(Product product, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader);

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

        return product;
    }
}
