package com.rentit.services;

import com.rentit.dao.interfaces.IReviewMapper;
import com.rentit.model.Review;
import com.rentit.model.ReviewSummary;
import com.rentit.model.User;
import com.rentit.model.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private IReviewMapper reviewMapper;

    @Autowired
    private UserService userService;


    public List<ReviewDTO> getReviewsByPage(String target, String targetId, int pageNum, int n) {
        boolean shouldReturnReviews = !"".equals(targetId) && targetId != null && pageNum > 0 && n > 0;
        if(!shouldReturnReviews) return List.of();
        switch (target) {
            case "product" -> {
                int productId = Integer.parseInt(targetId);
                List<ReviewDTO> reviews = reviewMapper.getNProductReviewsByPage(pageNum, n, productId);
                return reviews;
            }
            case "user" -> {
                User retreivedUser = userService.getUserFromEmail(targetId);
                return reviewMapper.getNUserReviewsByPage(pageNum, n, retreivedUser.getId());
            }
        }
        return List.of();
    }

    public Review addReview(String target, Review review, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);
        if (user == null || review == null) {
            return null;
        }
        switch (target) {
            case "product" -> {
                int productId = Integer.parseInt(review.getTargetId());
                if (review.getRating() > 0 && productId > 0) {
                    reviewMapper.addProductReview(review, user.getId());
                    return review;
                }
                return null;
            }
            case "user" -> {
                User retreivedUser = userService.getUserFromEmail(review.getTargetId());
                review.setTargetId(String.valueOf(retreivedUser.getId()));
                if (review.getRating() > 0 && retreivedUser.getId() > 0) {
                    reviewMapper.addUserReview(review, user.getId());
                    return review;
                }
                return null;
            }
        }
        return null;
    }

    public ReviewSummary getItemReviewSummary(String target, String targetId) {
        switch (target) {
            case "product" -> {
                if (!"".equals(targetId) && targetId != null) {
                    int productId = Integer.parseInt(targetId);
                    return reviewMapper.getProductReviewSummary(productId);
                }
                return null;
            }
            case "user" -> {
                if (!"".equals(targetId) && targetId != null) {
                    User retreivedUser = userService.getUserFromEmail(targetId);
                    return reviewMapper.getUserReviewSummary(retreivedUser.getId());
                }
                return null;
            }
        }
        return null;
    }
}
