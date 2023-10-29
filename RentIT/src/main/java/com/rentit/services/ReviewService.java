package com.rentit.services;

import com.rentit.dao.interfaces.IReviewMapper;
import com.rentit.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private IReviewMapper reviewMapper;


    public List<Review> getItemReviewsByPage(int itemId, int pageNum, int n) {
        if(itemId > 0 && pageNum > 0 && n > 0) {
            return reviewMapper.getNProductReviewsByPage(pageNum, n, itemId);
        }
        return null;
    }

    public Review addProductReview(Review review) {
        if(review != null && review.getRating() > 0 && review.getTargetId() > 0) {
            reviewMapper.addProductReview(review);
            return review;
        }
        return null;
    }
}
