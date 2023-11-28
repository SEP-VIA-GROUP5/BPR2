package com.rentit.services;

import com.rentit.dao.interfaces.IInquiryMapper;
import com.rentit.model.Inquiry;
import com.rentit.model.PriceFilteringColumn;
import com.rentit.model.User;
import com.rentit.model.dto.InquiryDTO;
import com.rentit.services.enums.ResponseMessage;
import com.rentit.utils.ServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static com.rentit.model.dto.InquiryDTO.buildInquiryDTO;

@Service
public class InquiryService {

    @Autowired
    private IInquiryMapper inquiryMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ServiceUtil serviceUtil;

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
        if(inquiry.getSenderPhoneNumber().isEmpty()){
            inquiry.setSenderPhoneNumber(user.getPhoneNumber());
        }
        if(inquiry.getSenderEmail().isEmpty()){
            inquiry.setSenderEmail(user.getEmail());
        }

        int directedToId = productService.getProductOwnerId(inquiry.getProductId());
        if(directedToId < 0){
            return null;
        }
        inquiry.setReceiverId(directedToId);
        inquiryMapper.addInquiry(inquiry);

        return buildInquiryDTO(inquiry,null, null);
    }

    public List<InquiryDTO> getAllReceivedInquiries(int pageNum, int n, Map<String, String> filters, String authorizationHeader) {
        if(pageNum < 0 || n < 0){
            return null;
        }
        User user = userService.getUserFromToken(authorizationHeader, true);
        if (user == null){
            return null;
        }
        if(filters.isEmpty()){
            return inquiryMapper.getReceivedInquiries(user.getId());
        }

        Map<PriceFilteringColumn, String> processedMap = serviceUtil.processFiltering(filters);
        return inquiryMapper.getAllReceivedInquiriesFiltered(pageNum, n, processedMap);
    }

    public ResponseMessage markViewed(int inquiryId, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);
        if(user == null){
            return ResponseMessage.CREDENTIALS_ERROR;
        }
        if(inquiryId < 0){
            return ResponseMessage.INVALID_PARAMETERS;
        }

        Inquiry inquiry = inquiryMapper.getInquiryById(inquiryId);

        if(inquiry.isViewed()){
            return ResponseMessage.SUCCESS;
        }
        if(inquiry.getReceiverId() != user.getId()){
            return ResponseMessage.CREDENTIALS_ERROR;
        }

        inquiryMapper.setViewed(inquiryId, LocalDate.now());
        return ResponseMessage.SUCCESS;
    }

    public List<InquiryDTO> getAllMyInquiries(int pageNum, int n, String authorizationHeader) {
        if(pageNum < 0 || n < 0){
            return null;
        }
        User user = userService.getUserFromToken(authorizationHeader, true);
        if(user == null){
            return null;
        }
        return inquiryMapper.getSentInquiries(user.getId());
    }

    //TODO fix me
    public ResponseMessage deleteInquiry(int inquiryId, String authorizationHeader) {
        User user = userService.getUserFromToken(authorizationHeader, true);
        Inquiry inquiry = inquiryMapper.getInquiryById(inquiryId);
        if(inquiryId < 0){
            return ResponseMessage.INVALID_PARAMETERS;
        }
        else if(user == null){
            return null;
        }
        else if(!Objects.equals(inquiry.getSenderId(), user.getId())) return null;
        else {
            inquiryMapper.deleteInquiry(inquiryId);
            return ResponseMessage.SUCCESS;
        }
    }
}
