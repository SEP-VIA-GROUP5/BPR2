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
import java.util.Map;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping(value = "/page/{pageNum}/{n}")
    public List<ProductDTO> getPageOfProducts(@PathVariable int pageNum, @PathVariable int n) {
        return productService.getNProductsByPage(pageNum, n);
    }

    @PostMapping(value = "/add", consumes = "application/json")
    public ProductDTO addProduct(@RequestBody Product product, @RequestHeader("Authorization") String authorizationHeader) {
        return productService.addProduct(product, authorizationHeader);
    }

    @GetMapping(value = "/id/{productId}")
    public ProductPackageDTO getProductById(@PathVariable int productId) {
        return productService.getProductById(productId);
    }

    @DeleteMapping(value = "/id/{productId}")
    public void deleteProductById(@PathVariable int productId,
                                  @RequestHeader("Authorization") String authorizationHeader,
                                  HttpServletResponse response) {
        ResponseMessage responseMessage = productService.deleteProductById(productId, authorizationHeader);
        switch (responseMessage) {
            case SUCCESS -> response.setStatus(204);
            case INVALID_PARAMETERS -> response.setStatus(404);
            case CREDENTIALS_ERROR -> response.setStatus(401);
            default -> response.setStatus(500);
        }
    }

    @GetMapping(value = "/page/{pageNum}/{n}/filter")
    public List<ProductDTO> getPageOfFilteredProducts(@PathVariable int pageNum, @PathVariable int n, @RequestParam Map<String, String> filters) {
        return productService.getNProductsByPageWithFilters(pageNum, n, filters);
    }

    @GetMapping(value = "/myList")
    public List<ProductDTO> getMyList(@RequestHeader("Authorization") String authorizationHeader) {
        return productService.getMyList(authorizationHeader);
    }

    @GetMapping(value = "/productList/{email}")
    public List<ProductDTO> getUserProductList(@PathVariable String email) {
        return productService.getUserProductList(email);
    }
    @PostMapping(value = {"/status/{id}/{status}","/status/{id}/{status}/{rentedUntil}"})
    public void setProductStatus(@PathVariable int id, @PathVariable String status, @PathVariable(required = false) String rentedUntil,
                                 @RequestHeader("Authorization") String authorizationHeader, HttpServletResponse response) {
        ResponseMessage responseMessage = productService.setProductStatus(id, status, authorizationHeader, rentedUntil);
        switch (responseMessage) {
            case SUCCESS -> response.setStatus(200);
            case CREDENTIALS_ERROR -> response.setStatus(401);
            case INVALID_PARAMETERS -> response.setStatus(400);
        }
    }

    @PatchMapping(value = "/edit", consumes = "application/json")
    public ProductDTO editProduct(@RequestBody Product product, @RequestHeader("Authorization") String authorizationHeader) {
        return productService.editProduct(product, authorizationHeader);
    }
}
