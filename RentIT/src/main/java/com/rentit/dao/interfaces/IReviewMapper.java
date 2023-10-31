package com.rentit.dao.interfaces;

import com.rentit.model.Review;
import com.rentit.model.ReviewSummary;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IReviewMapper {
    void addProductReview(Review review);
    void addUserReview(Review review);
    List<Review> getNProductReviewsByPage(int pageNum, int n, int productId);
    List<Review> getNUserReviewsByPage(int pageNum, int n, int userId);

    ReviewSummary getProductReviewSummary(int productId);

    ReviewSummary getUserReviewSummary(int userId);
}
