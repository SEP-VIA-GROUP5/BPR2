package com.rentit.dao.interfaces;


import com.rentit.model.PriceFilteringColumn;
import com.rentit.model.Product;
import com.rentit.model.dto.ProductDTO;
import com.rentit.model.enums.ProductStatus;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Mapper
public interface IProductMapper {
    List<ProductDTO> getNProductsByPage(int pageNum, int n);
    int addProduct(Product product);
    void addTags(List<String> tags, int productId);
    Product getProductById(int id);
    List<Product> getProductsByName(String name);
    void deleteProductById(int id);
    List<ProductDTO> getNProductsByPageWithFilters(int pageNum, int n, Map<PriceFilteringColumn, String> filters);
    List<ProductDTO> getProductsByUserId(int userId);
    int getProductOwnerId(int productId);
    void changeProductStatus(int productId, ProductStatus productStatus);
    void updateProduct(Product product);
    void setProductRentedUntilDate(int productId, LocalDate rentedUntil);
}
