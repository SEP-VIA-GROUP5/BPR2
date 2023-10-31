package com.rentit.services;

import com.rentit.dao.interfaces.IReportMapper;
import com.rentit.model.User;
import com.rentit.services.enums.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    UserService userService;

    @Autowired
    IReportMapper reportMapper;

    public ResponseMessage submitReport(String target, String targetId, String message, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);

        if(user != null) {
            switch (target){
                case "product" -> {
                    int productId = Integer.parseInt(targetId);
                    if(productId > 0 && !"".equals(message)) {
                        reportMapper.submitProductReport(user.getId(), productId, message);
                        return ResponseMessage.SUCCESS;
                    }
                    return ResponseMessage.INVALID_PARAMETERS;
                }
                case "user" -> {
                    if(!"".equals(targetId) && !"".equals(message)) {
                        reportMapper.submitUserReport(user.getId(), targetId, message);
                        return ResponseMessage.SUCCESS;
                    }
                    return ResponseMessage.INVALID_PARAMETERS;
                }
            }
            return ResponseMessage.INVALID_PARAMETERS;
        }
        return ResponseMessage.INVALID_USER;
    }
}
