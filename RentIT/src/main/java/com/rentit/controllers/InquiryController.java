package com.rentit.controllers;

import com.rentit.model.Inquiry;
import com.rentit.model.dto.InquiryDTO;
import com.rentit.services.InquiryService;
import com.rentit.services.enums.ResponseMessage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/inquiry")
public class InquiryController {
    @Autowired
    InquiryService inquiryService;

    @PostMapping(consumes = "application/json")
    public InquiryDTO postInquiry(@RequestBody Inquiry inquiry, @RequestHeader("Authorization") String authorizationHeader){
        return inquiryService.addInquiry(inquiry, authorizationHeader);
    }

    @RequestMapping(value = "/page/{pageNum}/{n}", method = RequestMethod.GET)
    public List<InquiryDTO> getAllInquiries(@PathVariable int pageNum, @PathVariable int n,
                                            @RequestHeader("Authorization") String authorizationHeader){
        return inquiryService.getAllReceivedInquiries(pageNum, n, authorizationHeader);
    }

    @PostMapping(value = "view/{inquiryId}")
    public void viewInquiry(@PathVariable int inquiryId, @RequestHeader("Authorization") String authorizationHeader,
                            HttpServletResponse response) throws IOException {
        ResponseMessage responseMessage = inquiryService.markViewed(inquiryId, authorizationHeader);
        switch (responseMessage){
            case SUCCESS -> response.setStatus(200);
            case CREDENTIALS_ERROR -> response.sendError(401, "Invalid/missing authorization");
            case INVALID_PARAMETERS -> response.sendError(400, "Invalid/missing parameters");
        }
    }

//    @PostMapping(value = "accept/{inquiryId}")
//    public void acceptInquiry(@PathVariable int inquiryId, @RequestHeader("Authorization") String authorizationHeader,
//                            HttpServletResponse response) throws IOException {
//        ResponseMessage responseMessage = inquiryService.acceptInquiry(inquiryId, authorizationHeader);
//        switch (responseMessage){
//            case SUCCESS -> response.setStatus(200);
//            case CREDENTIALS_ERROR -> response.sendError(401, "Invalid/missing authorization");
//            case INVALID_PARAMETERS -> response.sendError(400, "Invalid/missing parameters");
//        }
//    }
}
