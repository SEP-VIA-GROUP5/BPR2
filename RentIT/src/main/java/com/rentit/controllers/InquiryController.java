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
import java.util.Map;

@RestController
@RequestMapping("/inquiry")
public class InquiryController {
    @Autowired
    InquiryService inquiryService;

    @PostMapping(consumes = "application/json")
    public InquiryDTO postInquiry(@RequestBody Inquiry inquiry, @RequestHeader("Authorization") String authorizationHeader){
        return inquiryService.addInquiry(inquiry, authorizationHeader);
    }

    @GetMapping(value = "/page/{pageNum}/{n}")
    public List<InquiryDTO> getAllInquiries(@PathVariable int pageNum, @PathVariable int n,
                                            @RequestParam Map<String, String> filters,
                                            @RequestHeader("Authorization") String authorizationHeader){
        return inquiryService.getAllReceivedInquiries(pageNum, n, filters, authorizationHeader);
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

    @GetMapping(value = "/myInquiries/page/{pageNum}/{n}")
    public List<InquiryDTO> getAllMyInquiries(@PathVariable int pageNum, @PathVariable int n,
                                              @RequestHeader("Authorization") String authorizationHeader){
        return inquiryService.getAllMyInquiries(pageNum, n, authorizationHeader);
    }

    @DeleteMapping(value = "delete/{inquiryId}")
    public void deleteInquiry(@PathVariable int inquiryId, @RequestHeader("Authorization") String authorizationHeader,
                              HttpServletResponse response) throws IOException {
        ResponseMessage responseMessage = inquiryService.deleteInquiry(inquiryId, authorizationHeader);
        switch (responseMessage){
            case SUCCESS -> response.setStatus(200);
            case CREDENTIALS_ERROR -> response.sendError(401, "Invalid/missing authorization");
            case INVALID_PARAMETERS -> response.sendError(400, "Invalid/missing parameters");
        }
    }
}
