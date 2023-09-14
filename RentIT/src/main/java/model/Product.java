package model;

import lombok.Builder;


import java.util.List;

@Builder
public class Product {
    private final long id;
    private final String name;
    private final String description;
    private final float dayPrice;
    private final float weekPrice;
    private final float monthPrice;
    private final float deposit;
    private final String city;
    private final float productValue;
    private final int minLeasePeriod;
    private final String category;
    private final List<String> tags;
}
