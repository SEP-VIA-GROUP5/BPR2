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
    public void addProductReview_successfully_adds_review() {
        int productId = 5;
        int reviewerId = 1;
        Review review = Review.builder()
                .targetId(String.valueOf(productId))
                .rating(1)
                .message("Very bad")
                .build();
        UserDTO reviewer = userMapper.getUserDTOById(reviewerId);
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .review(review)
                .userDTO(reviewer)
                .build();

        reviewMapper.addProductReview(review, reviewerId);
        List<ReviewDTO> resultReviews = reviewMapper.getNProductReviewsByPage(1, 100, productId);
        assertThat(reviewDTO).isIn(resultReviews);
    }

    @Test
    public void getNProductReviewsByPage_returns_product_reviews() {
        int productId = 4;
        int n = 2;
        List<ReviewDTO> resultReviews = reviewMapper.getNProductReviewsByPage(1, n, productId);
        assertThat(resultReviews.size()).isEqualTo(n);
        assertThat(resultReviews).allSatisfy(r ->
                assertThat(r.getReview().getTargetId()).isEqualTo(String.valueOf(productId))
        );
    }

    @Test
    public void addUserReview_successfully_adds_review() {
        int userId = 5;
        int reviewerId = 1;
        Review review = Review.builder()
                .targetId(String.valueOf(userId))
                .rating(1)
                .message("Very bad")
                .build();
        UserDTO reviewer = userMapper.getUserDTOById(reviewerId);
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .review(review)
                .userDTO(reviewer)
                .build();
        reviewMapper.addUserReview(review, reviewerId);
        List<ReviewDTO> resultReviews = reviewMapper.getNUserReviewsByPage(1, 100, userId);
        assertThat(reviewDTO).isIn(resultReviews);
    }

    @Test
    public void getNUserReviewsByPage__returns_user_reviews() {
        int userId = 4;
        int n = 2;
        List<ReviewDTO> resultReviews = reviewMapper.getNUserReviewsByPage(1, n, userId);
        assertThat(resultReviews.size()).isEqualTo(n);
        assertThat(resultReviews).allSatisfy(r ->
                assertThat(r.getReview().getTargetId()).isEqualTo(String.valueOf(userId))
        );
    }

    @Test
    public void getProductReviewSummary_returns_avg_rating_and_review_count() {
        int productId = 4;
        ReviewSummary summary = reviewMapper.getProductReviewSummary(productId);
        assertThat(summary.getAvgRating()).isEqualTo(2.5);
        assertThat(summary.getReviewCount()).isEqualTo(2);
    }

    @Test
    public void getUserReviewSummary_returns_avg_rating_and_review_count() {
        int userId = 4;
        ReviewSummary summary = reviewMapper.getProductReviewSummary(userId);
        assertThat(summary.getAvgRating()).isEqualTo(2.5);
        assertThat(summary.getReviewCount()).isEqualTo(2);
    }
}
