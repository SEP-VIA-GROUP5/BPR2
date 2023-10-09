package com.rentit.services;

import com.rentit.dao.interfaces.IImageMapper;
import com.rentit.dao.interfaces.IProductMapper;
import com.rentit.model.Image;
import com.rentit.model.Product;
import com.rentit.model.User;
import com.rentit.model.enums.ProductStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
    private List<Image> images;
    private Product product;

    @Mock
    private IProductMapper productMapper;
    @Mock
    private IImageMapper imageMapper;
    @Mock
    private UserService userService;
    @InjectMocks
    private ProductService productService;

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
                .category("other")
                .tags(Arrays.asList("test tag", "test tag2"))
                .images(images)
                .status(ProductStatus.AVAILABLE)
                .rentedUntil(LocalDate.parse("2024-05-01"))
                .userId(1)
                .build();

    }

    @Test
    public void getNProductsByPageTest(){
        when(productMapper.getNProductsByPage(anyInt(),anyInt())).thenReturn(Collections.singletonList(product));
        List<Product> products = productService.getNProductsByPage(1,1);
        assertEquals(products,Collections.singletonList(product));
    }

    @Test
    public void getNProductsByPageTestError(){
        List<Product> products = productService.getNProductsByPage(-1,-1);
        assertNull(products);
    }

    @Test
    public void addProductWithAllParamsTest(){
        when(userService.getUserFromToken(anyString(),eq(true))).thenReturn(User.builder().id(1).location("Test city").build());
        when(productMapper.addProduct(any(Product.class))).thenReturn(0);
        Product addedProduct = productService.addProduct(product,"authString");
        assertEquals(addedProduct, product);
    }

    @Test
    public void addProductWithCertainEmptyParamsTest(){
        when(userService.getUserFromToken(anyString(),eq(true))).thenReturn(User.builder().id(1).location("Test city").build());
        when(productMapper.addProduct(any(Product.class))).thenReturn(0);
        Product alteredProduct = product;
        alteredProduct.setCategory("");
        alteredProduct.setCity("");
        Product addedProduct = productService.addProduct(alteredProduct,"authString");
        assertEquals(addedProduct, product);
    }

    @Test
    public void addProductTestError(){
        when(userService.getUserFromToken(anyString(),eq(true))).thenReturn(User.builder().id(1).build());
        Product addedProduct = productService.addProduct(null,"authString");
        assertNull(addedProduct);
        product.setDayPrice(0);
        addedProduct = productService.addProduct(product,"authString");
        assertNull(addedProduct);
        product.setDescription("");
        addedProduct = productService.addProduct(product,"authString");
        assertNull(addedProduct);
        product.setName("");
        addedProduct = productService.addProduct(product,"authString");
        assertNull(addedProduct);
    }
}
