package com.rentit.dao.interfaces;


import com.rentit.model.Product;

import java.util.List;

public interface IProductMapper {
    List<Product> getNProductsByPage(int pageNum, int n);
}
