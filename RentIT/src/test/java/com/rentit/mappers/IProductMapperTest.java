package com.rentit.mappers;

import com.rentit.dao.interfaces.IProductMapper;
import com.rentit.model.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IProductMapperTest {

    @Autowired
    private IProductMapper productMapper;

    @Test
    public void return_n_products_per_page() {
        int n = 3;
        List<Product> products = productMapper.getNProductsByPage(1, n);
        assertThat(products.size()).isEqualTo(3);
    }
}
