package com.rentit.dao.interfaces;

import com.rentit.model.Review;
import com.rentit.model.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IReviewMapper {
    void addProductReview(Review review);
    void addUserReview(Review review);
    List<ReviewDTO> getNProductReviewsByPage(int pageNum, int n, int productId);
    List<ReviewDTO> getNUserReviewsByPage(int pageNum, int n, int userId);

    double getProductReviewSummary(int productId);

    double getUserReviewSummary(int userId);
}
