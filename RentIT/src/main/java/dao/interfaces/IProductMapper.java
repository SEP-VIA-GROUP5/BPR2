package dao.interfaces;


import model.Product;

import java.util.List;

public interface IProductMapper {
    List<Product> getNProductsByPage(int pageNum);
}
