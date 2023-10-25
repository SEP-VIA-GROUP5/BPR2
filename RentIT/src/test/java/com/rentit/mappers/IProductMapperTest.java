package com.rentit.mappers;

import com.rentit.dao.interfaces.IImageMapper;
import com.rentit.dao.interfaces.IProductMapper;
import com.rentit.model.Product;
import com.rentit.model.dto.ProductDTO;
import com.rentit.model.enums.ProductStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IProductMapperTest {

    @Autowired
    private IProductMapper productMapper;
    @Autowired
    private IImageMapper imageMapper;

    @Test
    public void return_n_products_per_page() {
        int n = 3;
        List<ProductDTO> products = productMapper.getNProductsByPage(1, n);
        assertThat(products.size()).isEqualTo(3);
    }

    @Test
    public void add_product_successfully() {
        Product product = Product.builder()
                .name("test_product")
                .dayPrice(10)
                .weekPrice(10)
                .monthPrice(10)
                .city("test_city")
                .category("test_category")
                .status(ProductStatus.AVAILABLE)
                .images(List.of())
                .userId(1)
                .build();
        productMapper.addProduct(product);
        List<Product> products = productMapper.getProductsByName("test_product");
        assertThat(products.get(0)).isEqualTo(product);
    }

    @Test
    public void delete_product_by_id_cascades() {
        int productId = 5;
        productMapper.deleteProductById(productId);
        assertThat(productMapper.getProductById(5)).isNull();
        assertThat(imageMapper.getImagesByProductId(5)).isEmpty();
    }
}
