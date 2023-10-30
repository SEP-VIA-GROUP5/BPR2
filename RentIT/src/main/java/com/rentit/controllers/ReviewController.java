package com.rentit.controllers;

import com.rentit.model.Review;
import com.rentit.model.ReviewSummary;
import com.rentit.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @RequestMapping(value = "/{target}/page/{targetId}/{pageNum}/{n}", method = RequestMethod.GET)
    List<Review> getReviewsByPage(@PathVariable String target, @PathVariable int targetId, @PathVariable int pageNum, @PathVariable int n){
        return reviewService.getReviewsByPage(target, targetId, pageNum, n);
    }

    @RequestMapping(value = "/{target}", method = RequestMethod.POST)
    Review addReview(@PathVariable String target, @RequestBody Review review){
        return reviewService.addReview(target, review);
    }

    @RequestMapping(value = "/summary/{target}/{targetId}", method = RequestMethod.POST)
    ReviewSummary getItemReviewSummary(@PathVariable String target, @PathVariable String targetId){
        return reviewService.getItemReviewSummary(target, targetId);
    }
}
