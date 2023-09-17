package com.rentit.controllers;

import com.rentit.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.rentit.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/page/{pageNum}/{n}", method = RequestMethod.GET)
    public List<Product> getPageOfProducts(@PathVariable int pageNum, @PathVariable int n){
        return productService.getNProductsByPage(pageNum, n);
    }
}
