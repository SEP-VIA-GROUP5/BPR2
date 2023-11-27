package com.rentit.mappers;

import com.rentit.dao.interfaces.IImageMapper;
import com.rentit.dao.interfaces.IProductMapper;
import com.rentit.dao.interfaces.IUserMapper;
import com.rentit.model.PriceFilteringColumn;
import com.rentit.model.Product;
import com.rentit.model.dto.ProductDTO;
import com.rentit.model.dto.UserDTO;
import com.rentit.model.enums.ProductStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IProductMapperTest {

    @Autowired
    private IProductMapper productMapper;
    @Autowired
    private IImageMapper imageMapper;
    @Autowired
    private IUserMapper userMapper;

    @Test
    public void return_n_products_per_page() {
        int n = 3;
        List<ProductDTO> products = productMapper.getNProductsByPage(1, n);
        assertThat(products.size()).isEqualTo(3);
    }

    @Test
    public void return_n_products_per_page_with_filters() {
        int n = 2;
        Map<PriceFilteringColumn, String> filters = new HashMap<>();
        PriceFilteringColumn depositFilter = PriceFilteringColumn.builder()
                .columnName("deposit")
                .boundary("up")
                .build();
        PriceFilteringColumn dayPriceFilter = PriceFilteringColumn.builder()
                .columnName("day_price")
                .boundary("down")
                .build();
        filters.put(depositFilter, "103");
        filters.put(dayPriceFilter, "1");
        List<ProductDTO> products = productMapper.getNProductsByPageWithFilters(1, n, filters);
        assertThat(products.size()).isEqualTo(2);
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
                .tags(List.of())
                .userId(1)
                .build();
        productMapper.addProduct(product);
        List<Product> products = productMapper.getProductsByName("test_product");
        assertThat(products.get(0)).isEqualTo(product);
    }

    @Test
    public void addTags_successfully_adds_tags() {
        int productId = 1;
        ArrayList<String> previousTags = new ArrayList<>(productMapper.getProductById(productId).getTags());
        ArrayList<String> tags = new ArrayList<>();
        tags.add("tag1");
        tags.add("tag2");
        tags.addAll(previousTags);

        productMapper.addTags(tags, productId);
        Product result = productMapper.getProductById(productId);
        assertThat(result.getTags()).containsAll(tags);
    }

    @Test
    public void delete_product_by_id_cascades() {
        int productId = 6;
        productMapper.deleteProductById(productId);
        assertThat(productMapper.getProductById(6)).isNull();
        assertThat(imageMapper.getImagesByProductId(6)).isEmpty();
    }

    @Test
    public void get_products_by_user_id_returns_list_of_user_products() {
        int userId = 1;
        UserDTO user = userMapper.getUserDTOById(userId);
        List<ProductDTO> userProducts = productMapper.getProductsByUserId(userId);
        assertThat(userProducts.size()).isEqualTo(1);

    }
    @Test
    public void get_product_owner_id_returns_correct_user_id() {
        int userId = 1;
        int productOwnerId = productMapper.getProductOwnerId(1);
        assertThat(userId).isEqualTo(productOwnerId);
    }

    @Test
    public void changeProductStatus_successfully_changes_product_status() {
        int productId = 1;
        ProductStatus newStatus = ProductStatus.PAUSED;
        ProductStatus oldStatus = productMapper.getProductById(productId).getStatus();
        assertThat(oldStatus).isNotEqualTo(newStatus);
        productMapper.changeProductStatus(productId, newStatus);
        assertThat(productMapper.getProductById(productId).getStatus()).isEqualTo(newStatus);
        //Change back the status after test.
        productMapper.changeProductStatus(productId, oldStatus);
    }

    @Test
    public void updateProduct_successfully_updates_product() {
        int productId = 1;
        Product updatedProduct = Product.builder()
                .id(productId)
                .name("Product Name")
                .description("Product Description")
                .dayPrice(10.0f)
                .weekPrice(50.0f)
                .monthPrice(180.0f)
                .deposit(100.0f)
                .city("City")
                .productValue(5.0f)
                .minLeasePeriod(3)
                .category("Category")
                .status(ProductStatus.AVAILABLE)
                .rentedUntil(LocalDate.now().plusMonths(1))
                .build();
        Product oldProduct = productMapper.getProductById(productId);

        //Set old values that should not be updated or have to updated separately
        updatedProduct.setImages(oldProduct.getImages());
        updatedProduct.setUserId(oldProduct.getUserId());
        updatedProduct.setTags(oldProduct.getTags());

        assertThat(oldProduct).isNotEqualTo(updatedProduct);
        productMapper.updateProduct(updatedProduct);
        assertThat(productMapper.getProductById(productId)).isEqualTo(updatedProduct);
        productMapper.updateProduct(oldProduct);
    }
}
