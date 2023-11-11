package com.rentit.model.dto;

import com.rentit.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String location;
    private String phoneNumber;

    public static UserDTO buildUserDTO(User user){
        return UserDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .location(user.getLocation())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .build();
    }
}
