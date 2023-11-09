package com.rentit.model.dto;

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
}
