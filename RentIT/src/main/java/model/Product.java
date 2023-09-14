package model;

import lombok.Builder;


import java.util.List;
import java.util.UUID;

@Builder
public class Product {
    private final UUID id;
    private final String name;
    private final String description;
    private final float pricePerDay;
    private final String city;
    private final float productValue;
    private final int minLeasePeriod;
    private final String category;
    private final List<String> tags;
}
