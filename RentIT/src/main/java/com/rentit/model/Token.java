package com.rentit.model;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class Token {
    private String tokenName;
    private String tokenBody;
    private Instant expires;
}
