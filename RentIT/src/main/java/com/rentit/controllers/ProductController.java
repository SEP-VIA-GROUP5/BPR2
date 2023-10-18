package com.rentit.controllers;

import com.rentit.model.Product;
import com.rentit.model.dto.ProductDTO;
import com.rentit.model.dto.ProductPackageDTO;
import com.rentit.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/page/{pageNum}/{n}", method = RequestMethod.GET)
    public List<ProductDTO> getPageOfProducts(@PathVariable int pageNum, @PathVariable int n) {
        return productService.getNProductsByPage(pageNum, n);
    }

    //TODO maybe change into response entity
    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = "application/json")
    public ProductDTO addProduct(@RequestBody Product product, @RequestHeader("Authorization") String authorizationHeader) {
        return productService.addProduct(product, authorizationHeader);
    }

    @RequestMapping(value = "/id/{productId}", method = RequestMethod.GET)
    public ProductPackageDTO getProductById(@PathVariable int productId) {
        return productService.getProductById(productId);
    }
}
