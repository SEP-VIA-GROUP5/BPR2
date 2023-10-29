package com.rentit.controllers;

import com.rentit.model.Review;
import com.rentit.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
}
