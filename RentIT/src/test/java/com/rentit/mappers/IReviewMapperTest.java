package com.rentit.mappers;

import com.rentit.dao.interfaces.IReviewMapper;
import com.rentit.model.Review;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IReviewMapperTest {
    @Autowired
    private IReviewMapper reviewMapper;

    @Test
    public void add_product_review_successfully() {
        int productId = 5;
        Review review = Review.builder()
                .targetId(productId)
                .rating(1)
                .message("Very bad")
                .build();
        reviewMapper.addProductReview(review);
        List<Review> resultReviews = reviewMapper.getNProductReviewsByPage(1, 1, productId);
        assertThat(resultReviews.size()).isEqualTo(1);
        assertThat(resultReviews.get(0)).isEqualTo(review);
    }
    @Test
    public void get_product_reviews_returns_correct_reviews() {
        int productId = 4;
        List<Review> resultReviews = reviewMapper.getNProductReviewsByPage(1, 2, productId);
        assertThat(resultReviews.size()).isEqualTo(2);
    }

}
