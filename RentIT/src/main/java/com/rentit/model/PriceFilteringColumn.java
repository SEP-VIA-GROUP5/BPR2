package com.rentit.model;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PriceFilteringColumn {
    private String columnName;
    private String boundary;
}
