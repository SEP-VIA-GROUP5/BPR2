package com.rentit.dao.interfaces;


import com.rentit.model.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IProductMapper {
    List<Product> getNProductsByPage(int pageNum, int n);
}
