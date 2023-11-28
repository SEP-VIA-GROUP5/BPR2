package com.rentit.controllers;

import com.rentit.services.ReportService;
import com.rentit.services.enums.ResponseMessage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    ReportService reportService;

    @PostMapping(value = "/{target}/{targetId}")
    void SubmitReport(@PathVariable String target,
                      @PathVariable String targetId,
                      @RequestBody String message,
                      @RequestHeader("Authorization") String authorizationHeader,
                      HttpServletResponse response) throws IOException {
        ResponseMessage status = reportService.submitReport(target, targetId, message, authorizationHeader);

        switch (status){
            case SUCCESS -> response.setStatus(200);
            case INVALID_PARAMETERS -> response.sendError(400, "Invalid/missing parameters");
            case INVALID_USER -> response.sendError(400, "Invalid/missing user");
            default -> response.sendError(500, "Internal error");
        }

    }
}
