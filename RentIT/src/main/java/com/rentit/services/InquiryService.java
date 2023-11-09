package com.rentit.services;

import com.rentit.dao.interfaces.IInquiryMapper;
import com.rentit.model.Inquiry;
import com.rentit.model.User;
import com.rentit.model.dto.InquiryDTO;
import com.rentit.model.dto.UserDTO;
import com.rentit.services.enums.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InquiryService {

    @Autowired
    IInquiryMapper inquiryMapper;

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    public static InquiryDTO buildInquiryDTO(Inquiry inquiry, UserDTO userDTO){
        return InquiryDTO.builder()
                .productId(inquiry.getProductId())
//                .accepted(inquiry.isAccepted())
                .message(inquiry.getMessage())
                .timeStamp(inquiry.getTimeStamp())
                .userEmail(inquiry.getUserEmail())
                .userPhoneNumber(inquiry.getUserPhoneNumber())
                .viewedAt(inquiry.getViewedAt())
//                .acceptedAt(inquiry.getAcceptedAt())
                .userDTO(userDTO)
                .build();
    }

    public InquiryDTO addInquiry(Inquiry inquiry, String authorizationHeader) {
        if(inquiry.getProductId() < 1) {
            return null;
        }

        User user = userService.getUserFromToken(authorizationHeader, true);

        if(user == null) {
            return null;
        }

        inquiry.setSenderId(user.getId());
        inquiry.setViewed(false);
//        inquiry.setAccepted(false);
        inquiry.setTimeStamp(LocalDate.now());
        inquiry.setUserEmail(user.getEmail());
        inquiry.setUserPhoneNumber(user.getPhoneNumber() != null ? user.getPhoneNumber() : null);

        int directedToId = productService.getProductOwnerId(inquiry.getProductId());
        if(directedToId < 0){
            return null;
        }
        inquiry.setDirectedToId(directedToId);
        inquiryMapper.addInquiry(inquiry);

        return buildInquiryDTO(inquiry,null);
    }

    public List<InquiryDTO> getAllReceivedInquiries(int pageNum, int n,String authorizationHeader) {
        if(pageNum < 0 || n < 0){
            return null;
        }
        User user = userService.getUserFromToken(authorizationHeader, true);
        if (user == null){
            return null;
        }
        return inquiryMapper.getAllReceivedInquiries(user.getId());
    }

    public ResponseMessage markViewed(int inquiryId, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, false);
        if(user == null){
            return ResponseMessage.CREDENTIALS_ERROR;
        }
        if(inquiryId < 0){
            return ResponseMessage.INVALID_PARAMETERS;
        }

        Inquiry inquiry = inquiryMapper.getInquiry(inquiryId);

        if(inquiry.isViewed()){
            return ResponseMessage.SUCCESS;
        }
        if(inquiry.getDirectedToId() != user.getId()){
            return ResponseMessage.CREDENTIALS_ERROR;
        }

        inquiryMapper.setViewed(inquiryId, LocalDate.now());
        return ResponseMessage.SUCCESS;
    }

//    public ResponseMessage acceptInquiry(int inquiryId, String authorizationHeader) {
//        User user = userService.getUserFromToken(authorizationHeader, false);
//        if(user == null){
//            return ResponseMessage.CREDENTIALS_ERROR;
//        }
//        if(inquiryId < 0){
//            return ResponseMessage.INVALID_PARAMETERS;
//        }
//
//        Inquiry inquiry = inquiryMapper.getInquiry(inquiryId);
//
//        if(inquiry.isAccepted()){
//            return ResponseMessage.SUCCESS;
//        }
//        if(inquiry.getDirectedToId() != user.getId()){
//            return ResponseMessage.CREDENTIALS_ERROR;
//        }
//
//        inquiryMapper.setAccepted(inquiryId, LocalDate.now());
//        return ResponseMessage.SUCCESS;
//    }

}
