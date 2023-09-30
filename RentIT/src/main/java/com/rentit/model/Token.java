package com.rentit.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Token {
    private String tokenName;
    private String tokenBody;
    private String expires;
}
