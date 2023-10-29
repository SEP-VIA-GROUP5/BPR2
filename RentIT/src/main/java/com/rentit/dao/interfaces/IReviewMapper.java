package com.rentit.dao.interfaces;

import com.rentit.model.Review;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IReviewMapper {
    void addProductReview(Review review);
    List<Review> getNProductReviewsByPage(int pageNum, int n, int productId);
}
