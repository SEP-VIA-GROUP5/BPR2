package com.rentit.mappers;

import com.rentit.dao.interfaces.IReviewMapper;
import com.rentit.dao.interfaces.IUserMapper;
import com.rentit.model.Review;
import com.rentit.model.ReviewSummary;
import com.rentit.model.dto.ReviewDTO;
import com.rentit.model.dto.UserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IReviewMapperTest {
    @Autowired
    private IReviewMapper reviewMapper;
    @Autowired
    private IUserMapper userMapper;

    @Test
    public void add_product_review_successfully() {
        int productId = 5;
        int reviewerId = 1;
        Review review = Review.builder()
                .targetId(String.valueOf(productId))
                .rating(1)
                .message("Very bad")
                .build();
        UserDTO reviewer = userMapper.getUserDTOById(reviewerId);

        reviewMapper.addProductReview(review, reviewerId);
        List<ReviewDTO> resultReviews = reviewMapper.getNProductReviewsByPage(1, 1, productId);
        ReviewDTO result = resultReviews.get(0);
        assertThat(resultReviews.size()).isEqualTo(1);
        assertThat(result.getReview()).isEqualTo(review);
        assertThat(result.getUserDTO()).isEqualTo(reviewer);
    }

    @Test
    public void get_product_reviews_returns_correct_reviews() {
        int productId = 4;
        List<ReviewDTO> resultReviews = reviewMapper.getNProductReviewsByPage(1, 2, productId);
        assertThat(resultReviews.size()).isEqualTo(2);
    }

    @Test
    public void add_user_review_successfully() {
        int userId = 5;
        int reviewerId = 1;
        Review review = Review.builder()
                .targetId(String.valueOf(userId))
                .rating(1)
                .message("Very bad")
                .build();
        reviewMapper.addUserReview(review, reviewerId);
        List<ReviewDTO> resultReviews = reviewMapper.getNUserReviewsByPage(1, 1, userId);
        UserDTO reviewer = userMapper.getUserDTOById(reviewerId);
        ReviewDTO result = resultReviews.get(0);
        assertThat(resultReviews.size()).isEqualTo(1);
        assertThat(result.getReview()).isEqualTo(review);
        assertThat(result.getUserDTO()).isEqualTo(reviewer);
    }

    @Test
    public void get_user_reviews_returns_correct_reviews() {
        int userId = 4;
        List<ReviewDTO> resultReviews = reviewMapper.getNUserReviewsByPage(1, 2, userId);
        assertThat(resultReviews.size()).isEqualTo(2);
    }

    @Test
    public void get_product_review_summary_returns_avg_rating() {
        int productId = 4;
        ReviewSummary summary = reviewMapper.getProductReviewSummary(productId);
        assertThat(summary.getAvgRating()).isEqualTo(2.5);
        assertThat(summary.getReviewCount()).isEqualTo(2);
    }

    @Test
    public void get_user_review_summary_returns_avg_rating() {
        int userId = 4;
        ReviewSummary summary = reviewMapper.getProductReviewSummary(userId);
        assertThat(summary.getAvgRating()).isEqualTo(2.5);
        assertThat(summary.getReviewCount()).isEqualTo(2);
    }
}
