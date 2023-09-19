package com.rentit.controllers;

import com.rentit.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.rentit.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/page/{pageNum}/{n}", method = RequestMethod.GET)
    public List<Product> getPageOfProducts(@PathVariable int pageNum, @PathVariable int n){
        return productService.getNProductsByPage(pageNum, n);
    }
}
