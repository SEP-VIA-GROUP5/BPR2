package com.rentit.dao.interfaces;


import com.rentit.model.Product;
import com.rentit.model.dto.ProductDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IProductMapper {
    List<ProductDTO> getNProductsByPage(int pageNum, int n);
    int addProduct(Product product);
    Product getProductById(int id);
    List<Product> getProductsByName(String name);
    void deleteProductById(int id);

    List<ProductDTO> getNProductsByPageByLocation(int pageNum, int n, String location);
}
