package com.rentit.model;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private long id;
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
    private String image;
}
