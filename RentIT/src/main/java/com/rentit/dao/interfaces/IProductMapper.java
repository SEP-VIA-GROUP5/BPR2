package com.rentit.dao.interfaces;


import com.rentit.model.PriceFilteringColumn;
import com.rentit.model.Product;
import com.rentit.model.dto.ProductDTO;
import com.rentit.model.enums.ProductStatus;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface IProductMapper {
    List<ProductDTO> getNProductsByPage(int pageNum, int n);
    int addProduct(Product product);
    Product getProductById(int id);
    ProductDTO getProductDTOById(int id);
    List<Product> getProductsByName(String name);
    void deleteProductById(int id);
    List<ProductDTO> getNProductsByPageWithFilters(int pageNum, int n, Map<PriceFilteringColumn, String> filters);
    List<ProductDTO> getProductsByUserId(int userId);
    int getProductOwnerId(int productId);
    void changeProductStatus(int productId, ProductStatus productStatus);
}
