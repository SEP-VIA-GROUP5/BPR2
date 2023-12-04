package com.rentit.controllers;

import com.rentit.model.Review;
import com.rentit.model.ReviewSummary;
import com.rentit.model.dto.ReviewDTO;

import com.rentit.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @GetMapping(value = "/{target}/page/{targetId}/{pageNum}/{n}")
    List<ReviewDTO> getReviewsByPage(@PathVariable String target, @PathVariable String targetId, @PathVariable int pageNum, @PathVariable int n){
        return reviewService.getReviewsByPage(target, targetId, pageNum, n);
    }

    @PostMapping(value = "/{target}")
    Review addReview(@PathVariable String target, @RequestBody Review review, @RequestHeader("Authorization") String authorizationHeader){
        return reviewService.addReview(target, review, authorizationHeader);
    }

    @GetMapping(value = "/summary/{target}/{targetId}")
    ReviewSummary getItemReviewSummary(@PathVariable String target, @PathVariable String targetId){
        return reviewService.getItemReviewSummary(target, targetId);
    }
}
