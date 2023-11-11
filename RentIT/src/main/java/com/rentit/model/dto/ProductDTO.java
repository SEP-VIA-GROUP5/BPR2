package com.rentit.model.dto;

import com.rentit.model.Image;
import com.rentit.model.Product;
import com.rentit.model.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
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

    public static ProductDTO buildProductDTO(Product product){
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .dayPrice(product.getDayPrice())
                .weekPrice(product.getWeekPrice())
                .monthPrice(product.getMonthPrice())
                .deposit(product.getDeposit())
                .city(product.getCity())
                .productValue(product.getProductValue())
                .minLeasePeriod(product.getMinLeasePeriod())
                .category(product.getCategory())
                .tags(product.getTags())
                .images(product.getImages())
                .status(product.getStatus())
                .rentedUntil(product.getRentedUntil())
                .build();
    }
}