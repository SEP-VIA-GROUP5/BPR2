package com.rentit.dao.interfaces;

import com.rentit.model.Review;
import com.rentit.model.ReviewSummary;
import com.rentit.model.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IReviewMapper {
    void addProductReview(Review review, int reviewerId);
    void addUserReview(Review review, int reviewerId);
    List<ReviewDTO> getNProductReviewsByPage(int pageNum, int n, int productId);
    List<ReviewDTO> getNUserReviewsByPage(int pageNum, int n, int userId);

    ReviewSummary getProductReviewSummary(int productId);

    ReviewSummary getUserReviewSummary(int userId);
}
