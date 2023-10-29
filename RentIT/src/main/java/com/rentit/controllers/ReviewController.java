package com.rentit.controllers;

import com.rentit.model.Review;
import com.rentit.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @RequestMapping(value = "/page/{itemId}/{pageNum}/{n}", method = RequestMethod.GET)
    List<Review> getItemReviewsByPage(@PathVariable int itemId, @PathVariable int pageNum, @PathVariable int n){
        return reviewService.getItemReviewsByPage(itemId, pageNum, n);
    }

    @RequestMapping(value = "/product", method = RequestMethod.POST)

    Review addItemReview(@RequestBody Review review){
        return reviewService.addProductReview(review);
    }
}
