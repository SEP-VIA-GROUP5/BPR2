package com.rentit.controllers;

import com.rentit.model.Image;
import com.rentit.model.Product;
import com.rentit.model.dto.ProductDTO;
import com.rentit.model.dto.ProductPackageDTO;
import com.rentit.model.dto.UserDTO;
import com.rentit.model.enums.ProductStatus;
import com.rentit.services.ProductService;
import com.rentit.services.enums.ResponseMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.emptyOrNullString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ProductControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ProductService service;

    private List<Image> images;
    private Product product;
    private ProductDTO productDTO;
    private UserDTO userDTO;
    @BeforeEach
    void beforeEach(){
        images = new ArrayList<>();
        images.add(Image.builder().imageUrl("http://test.url").id(1).build());
        product = Product.builder()
                .id(1)
                .name("Test name")
                .description("Test description")
                .dayPrice(5)
                .weekPrice(10)
                .monthPrice(100)
                .deposit(10)
                .city("Test city")
                .productValue(100)
                .minLeasePeriod(1)
                .category("test category")
                .tags(Arrays.asList("test tag", "test tag2"))
                .images(images)
                .status(ProductStatus.AVAILABLE)
                .rentedUntil(LocalDate.parse("2024-05-01"))
                .userId(1)
                .build();
        productDTO = ProductDTO.builder()
                .id(1)
                .name("Test name")
                .description("Test description")
                .dayPrice(5)
                .weekPrice(10)
                .monthPrice(100)
                .deposit(10)
                .city("Test city")
                .productValue(100)
                .minLeasePeriod(1)
                .category("test category")
                .tags(Arrays.asList("test tag", "test tag2"))
                .images(images)
                .status(ProductStatus.AVAILABLE)
                .rentedUntil(LocalDate.parse("2024-05-01"))
                .build();
        userDTO = UserDTO.builder()
                .email("testemail@gmail.com")
                .firstName("Test name")
                .lastName("Test lastname")
                .location("Test city")
                .phoneNumber("123")
                .build();
    }

    @Test
    public void testGetPageOfProducts() throws Exception {
        when(service.getNProductsByPage(1,1)).thenReturn(Collections.singletonList(productDTO));
        this.mvc.perform(get("http://localhost:8080/product/page/1/1")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1,\"name\":\"Test name\",\"description\":\"Test description\",\"dayPrice\":5.0,\"weekPrice\":10.0,\"monthPrice\":100.0,\"deposit\":10.0,\"city\":\"Test city\",\"productValue\":100.0,\"minLeasePeriod\":1,\"category\":\"test category\",\"tags\":[\"test tag\",\"test tag2\"],\"images\":[{\"id\":1,\"imageUrl\":\"http://test.url\"}],\"status\":\"AVAILABLE\",\"rentedUntil\":\"2024-05-01\"}]"));
    }

    @Test
    public void testGetPageOfProductsErrors() throws Exception {
        when(service.getNProductsByPage(1,1)).thenReturn(Collections.singletonList(productDTO));
        this.mvc.perform(get("http://localhost:8080/product/page")).andDo(print())
                .andExpect(status().isNotFound());
        this.mvc.perform(get("http://localhost:8080/product/page/a")).andDo(print())
                .andExpect(status().isNotFound());
        this.mvc.perform(get("http://localhost:8080/product/page/a/a")).andDo(print())
                .andExpect(status().isBadRequest());

    }

    @Test
    public void testAddProduct() throws Exception {
        when(service.addProduct(product,"test")).thenReturn(productDTO);
        this.mvc.perform(post("http://localhost:8080/product/add")
                .content("{\"id\":1,\"name\":\"Test name\",\"description\":\"Test description\",\"dayPrice\":5.0,\"weekPrice\":10.0,\"monthPrice\":100.0,\"deposit\":10.0,\"city\":\"Test city\",\"productValue\":100.0,\"minLeasePeriod\":1,\"category\":\"test category\",\"tags\":[\"test tag\",\"test tag2\"],\"images\":[{\"id\":1,\"imageUrl\":\"http://test.url\"}],\"status\":\"AVAILABLE\",\"rentedUntil\":\"2024-05-01\",\"userId\":1}")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization","test")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json("{\"id\":1,\"name\":\"Test name\",\"description\":\"Test description\",\"dayPrice\":5.0,\"weekPrice\":10.0,\"monthPrice\":100.0,\"deposit\":10.0,\"city\":\"Test city\",\"productValue\":100.0,\"minLeasePeriod\":1,\"category\":\"test category\",\"tags\":[\"test tag\",\"test tag2\"],\"images\":[{\"id\":1,\"imageUrl\":\"http://test.url\"}],\"status\":\"AVAILABLE\",\"rentedUntil\":\"2024-05-01\"}"));
    }

    @Test
    public void testAddProductErrors() throws Exception {
        when(service.addProduct(product,"test")).thenReturn(productDTO);
        this.mvc.perform(post("http://localhost:8080/product/add")
                        .content("[]")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization","test")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteProduct() throws Exception {
        when(service.deleteProductById(1,"test")).thenReturn(ResponseMessage.SUCCESS);
        this.mvc.perform(delete("http://localhost:8080/product/id/1")
                        .header("Authorization","test"))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteProductErrors() throws Exception {
        this.mvc.perform(delete("http://localhost:8080/product/id/a")
                        .header("Authorization","test"))
                .andDo(print())
                .andExpect(status().isBadRequest());
        when(service.deleteProductById(-1,"test")).thenReturn(ResponseMessage.INVALID_PARAMETERS);
        this.mvc.perform(delete("http://localhost:8080/product/id/-1")
                        .header("Authorization","test"))
                .andDo(print())
                .andExpect(status().isNotFound());
        when(service.deleteProductById(1,"test")).thenReturn(ResponseMessage.CREDENTIALS_ERROR);
        this.mvc.perform(delete("http://localhost:8080/product/id/1")
                        .header("Authorization","test"))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetProductById() throws Exception {
        when(service.getProductById(1)).thenReturn(new ProductPackageDTO(productDTO, userDTO));
        this.mvc.perform(get("http://localhost:8080/product/id/1")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json("{\"product\":{\"id\":1,\"name\":\"Test name\",\"description\":\"Test description\",\"dayPrice\":5.0,\"weekPrice\":10.0,\"monthPrice\":100.0,\"deposit\":10.0,\"city\":\"Test city\",\"productValue\":100.0,\"minLeasePeriod\":1,\"category\":\"test category\",\"tags\":[\"test tag\",\"test tag2\"],\"images\":[{\"id\":1,\"imageUrl\":\"http://test.url\"}],\"status\":\"AVAILABLE\",\"rentedUntil\":\"2024-05-01\"},\"user\":{\"email\":\"testemail@gmail.com\",\"firstName\":\"Test name\",\"lastName\":\"Test lastname\",\"location\":\"Test city\",\"phoneNumber\":\"123\"}}"));
    }

    @Test
    public void testGetProductByIdErrors() throws Exception {
        when(service.getProductById(-1)).thenReturn(null);
        this.mvc.perform(get("http://localhost:8080/product/id/-1")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(emptyOrNullString()));
    }

    @Test
    public void testGetPageOfFilteredProducts() throws Exception {
        when(service.getNProductsByPageWithFilters(1, 1, Collections.emptyMap())).thenReturn(Collections.singletonList(productDTO));
        this.mvc.perform(get("http://localhost:8080/product/page/1/1/filter")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1,\"name\":\"Test name\",\"description\":\"Test description\",\"dayPrice\":5.0,\"weekPrice\":10.0,\"monthPrice\":100.0,\"deposit\":10.0,\"city\":\"Test city\",\"productValue\":100.0,\"minLeasePeriod\":1,\"category\":\"test category\",\"tags\":[\"test tag\",\"test tag2\"],\"images\":[{\"id\":1,\"imageUrl\":\"http://test.url\"}],\"status\":\"AVAILABLE\",\"rentedUntil\":\"2024-05-01\"}]"));
    }

    @Test
    public void testGetMyList() throws Exception {
        when(service.getMyList("test")).thenReturn(Collections.singletonList(productDTO));
        this.mvc.perform(get("http://localhost:8080/product/myList").header("Authorization", "test")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1,\"name\":\"Test name\",\"description\":\"Test description\",\"dayPrice\":5.0,\"weekPrice\":10.0,\"monthPrice\":100.0,\"deposit\":10.0,\"city\":\"Test city\",\"productValue\":100.0,\"minLeasePeriod\":1,\"category\":\"test category\",\"tags\":[\"test tag\",\"test tag2\"],\"images\":[{\"id\":1,\"imageUrl\":\"http://test.url\"}],\"status\":\"AVAILABLE\",\"rentedUntil\":\"2024-05-01\"}]"));
    }

    @Test
    public void testGetUserProductList() throws Exception {
        when(service.getUserProductList("test@example.com")).thenReturn(Collections.singletonList(productDTO));
        this.mvc.perform(get("http://localhost:8080/product/productList/test@example.com")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1,\"name\":\"Test name\",\"description\":\"Test description\",\"dayPrice\":5.0,\"weekPrice\":10.0,\"monthPrice\":100.0,\"deposit\":10.0,\"city\":\"Test city\",\"productValue\":100.0,\"minLeasePeriod\":1,\"category\":\"test category\",\"tags\":[\"test tag\",\"test tag2\"],\"images\":[{\"id\":1,\"imageUrl\":\"http://test.url\"}],\"status\":\"AVAILABLE\",\"rentedUntil\":\"2024-05-01\"}]"));
    }

    @Test
    public void testSetProductStatus() throws Exception {
        when(service.setProductStatus(1, "status", "test", null)).thenReturn(ResponseMessage.SUCCESS);
        this.mvc.perform(post("http://localhost:8080/product/status/1/status").header("Authorization", "test")).andDo(print())
                .andExpect(status().isOk());
    }
}
