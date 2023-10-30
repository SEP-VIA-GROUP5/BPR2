package com.rentit.services;

import com.rentit.dao.interfaces.IReviewMapper;
import com.rentit.model.Review;
import com.rentit.model.ReviewSummary;
import com.rentit.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private IReviewMapper reviewMapper;

    @Autowired
    private UserService userService;


    public List<Review> getReviewsByPage(String target, String targetId, int pageNum, int n) {
        switch (target){
            case "product" -> {
                int productId = Integer.parseInt(targetId);
                if(productId > 0 && pageNum > 0 && n > 0) {
                    return reviewMapper.getNProductReviewsByPage(pageNum, n, productId);
                }
                return null;
            }
            case "user" -> {
                if(!"".equals(targetId) && pageNum > 0 && n > 0) {
                    return reviewMapper.getNUserReviewsByPage(pageNum, n, targetId);
                }
                return null;
            }
        }
        return null;
    }

    public Review addReview(String target, Review review, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, false);
        if(user == null){
            return null;
        }
        switch (target){
            case "product" -> {
                if(review != null && review.getRating() > 0 && review.getTargetId() > 0) {
                    reviewMapper.addProductReview(review);
                    return review;
                }
                return null;
            }
            case "user" -> {
                if(review != null && review.getRating() > 0 && review.getTargetId() > 0) {
                    reviewMapper.addUserReview(review);
                    return review;
                }
                return null;
            }
        }
        return null;
    }

    public ReviewSummary getItemReviewSummary(String target, String targetId) {
        switch (target){
            case "product" -> {
                if(!"".equals(targetId) && targetId != null){
                    int productId = Integer.parseInt(targetId);
                    return reviewMapper.getProductReviewSummary(productId);
                }
                return null;
            }
            case "user" -> {
                if(!"".equals(targetId) && targetId != null){
                    return reviewMapper.getUserReviewSummary(targetId);
                }
                return null;
            }
        }
        return null;
    }
}
