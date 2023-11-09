package com.rentit.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Inquiry {
    int inquiryId;
    int productId;
    String message;
    LocalDate timeStamp;
    int senderId;
    String userEmail;
    String userPhoneNumber;
    int directedToId;
    boolean viewed;
    LocalDate viewedAt;
    LocalDate rentStart;
    LocalDate rentEnd;
}
