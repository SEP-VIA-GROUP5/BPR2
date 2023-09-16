package services;

import dao.interfaces.IProductMapper;
import model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductService {
    @Autowired
    private IProductMapper productMapper;

    public List<Product> getNProductsByPage(int pageNum, int n){
        if(pageNum > 0 && n > 0){
            return productMapper.getNProductsByPage(pageNum, n);
        }
        return null;
    }
}
