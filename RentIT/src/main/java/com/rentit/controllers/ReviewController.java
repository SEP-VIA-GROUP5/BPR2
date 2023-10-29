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

    @RequestMapping(value = "/{target}/page/{itemId}/{pageNum}/{n}", method = RequestMethod.GET)
    List<Review> getItemReviewsByPage(@PathVariable String target, @PathVariable int itemId, @PathVariable int pageNum, @PathVariable int n){
        return reviewService.getReviewsByPage(target, itemId, pageNum, n);
    }

    @RequestMapping(value = "/{target}", method = RequestMethod.POST)
    Review addItemReview(@PathVariable String target, @RequestBody Review review){
        return reviewService.addReview(target, review);
    }
}
