package com.rentit.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
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
}
