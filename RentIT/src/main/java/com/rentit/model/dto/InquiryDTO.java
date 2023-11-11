package com.rentit.model.dto;

import com.rentit.model.Inquiry;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InquiryDTO {
    int inquiryId;
    int productId;
    String message;
    LocalDate timeStamp;
    String userEmail;
    String userPhoneNumber;
    boolean viewed;
    LocalDate viewedAt;
    LocalDate rentStart;
    LocalDate rentEnd;
    UserDTO userDTO;

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
}
