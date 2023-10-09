package com.rentit.model;

import com.rentit.model.enums.ProductStatus;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
//TODO might need to convert to DTO class
public class Product {
    private int id;
    private String name;
    private String description;
    private float dayPrice;
    private float weekPrice;
    private float monthPrice;
    private float deposit;
    private String city;
    private float productValue;
    private int minLeasePeriod;
    private String category;
    private List<String> tags;
    private List<Image> images;
    private ProductStatus status;
    private LocalDate rentedUntil;
    private int userId;
}
