package com.rentit.services;

import com.rentit.dao.interfaces.IReviewMapper;
import com.rentit.model.Review;
import com.rentit.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private IReviewMapper reviewMapper;

    @Autowired
    UserService userService;


    public List<Review> getReviewsByPage(String target, int targetId, int pageNum, int n) {
        switch (target){
            case "product" -> {
                if(targetId > 0 && pageNum > 0 && n > 0) {
                    return reviewMapper.getNProductReviewsByPage(pageNum, n, targetId);
                }
                return null;
            }
            case "user" -> {
                if(targetId > 0 && pageNum > 0 && n > 0) {
                    return reviewMapper.getNUserReviewsByPage(pageNum, n, targetId);
                }
                return null;
            }
        }
        return null;
    }

    public Review addReview(String target, Review review, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);
        if(user == null || review == null) {
            return null;
        }
        switch (target){
            case "product" -> {
                int productId = Integer.parseInt(review.getTargetId());
                if(review.getRating() > 0 && productId > 0) {
                    reviewMapper.addProductReview(review);
                    return review;
                }
                return null;
            }
            case "user" -> {
                User retreivedUser = userService.getUserFromEmail(review.getTargetId());
                review.setTargetId(String.valueOf(retreivedUser.getId()));
                if(review.getRating() > 0 && retreivedUser.getId() > 0) {
                    reviewMapper.addUserReview(review);
                    return review;
                }
                return null;
            }
        }
        return null;
    }

    public double getItemReviewSummary(String target, String targetId) {
        switch (target){
            case "product" -> {
                if(!"".equals(targetId) && targetId != null){
                    int productId = Integer.parseInt(targetId);
                    return reviewMapper.getProductReviewSummary(productId);
                }
                return -1;
            }
            case "user" -> {
                if(!"".equals(targetId) && targetId != null){
                    User retreivedUser = userService.getUserFromEmail(targetId);
                    return reviewMapper.getUserReviewSummary(retreivedUser.getId());
                }
                return -1;
            }
        }
        return -1;
    }
}