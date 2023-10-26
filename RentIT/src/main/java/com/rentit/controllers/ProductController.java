package com.rentit.controllers;

import com.rentit.model.Product;
import com.rentit.model.dto.ProductDTO;
import com.rentit.model.dto.ProductPackageDTO;
import com.rentit.services.ProductService;
import com.rentit.services.enums.ResponseMessage;
import jakarta.servlet.http.HttpServletResponse;
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

    @RequestMapping(value = "/id/{productId}", method = RequestMethod.DELETE)
    public void deleteProductById(@PathVariable int productId,
                                               @RequestHeader("Authorization") String authorizationHeader,
                                               HttpServletResponse response) {
        ResponseMessage responseMessage = productService.deleteProductById(productId, authorizationHeader);
        switch (responseMessage){
            case SUCCESS -> response.setStatus(204);
            case DELETION_ERROR -> response.setStatus(404);
            case INTERNAL_ERROR -> response.setStatus(500);
        }
    }

    @RequestMapping(value = "/page/{pageNum}/{n}/filter={filter}&prop={property}", method = RequestMethod.GET)
    public List<ProductDTO> getPageOfProducts(@PathVariable int pageNum, @PathVariable int n, @PathVariable String filter,
                                              @PathVariable String property) {
        return productService.getNProductsByPageWithFilter(pageNum, n, filter, property);
    }
}
