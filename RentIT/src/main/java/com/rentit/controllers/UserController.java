package com.rentit.controllers;

import com.rentit.model.Token;
import com.rentit.model.User;
import com.rentit.model.dto.UserDTO;
import com.rentit.services.UserService;
import com.rentit.services.enums.ResponseMessage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/register", consumes = "application/json")
    public void registerUser(@RequestBody User user, HttpServletResponse response) throws IOException {
        ResponseMessage responseMessage = userService.registerUser(user);
        switch (responseMessage) {
            case SUCCESS -> response.setStatus(200);
            case PASSWORD_ERROR -> response.sendError(400, "Password does not match requirements");
            case EXISTING_EMAIL -> response.sendError(400, "Account with this email already exists");
            default -> response.sendError(500, "Internal server error");
        }
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public Token loginUser(@RequestBody User user, HttpServletResponse response) throws IOException {
        ResponseMessage responseMessage = userService.loginUser(user);

        switch (responseMessage) {
            case SUCCESS -> {
                return userService.authenticateUser(user);
            }
            case CREDENTIALS_ERROR -> response.sendError(400, "Make sure the password matches requirements");
            default -> response.sendError(500, "Internal server error");
        }
        return Token.builder().build();
    }

    @GetMapping(value = "/getUser")
    public UserDTO getUser(@RequestHeader("Authorization") String authorizationHeader) {
        return userService.getUser(authorizationHeader);
    }

    @GetMapping(value = "/getUser/{userEmail}")
    public UserDTO getUserByEmail(@PathVariable String userEmail) {
        return userService.getUserByEmail(userEmail);
    }

    @GetMapping(value = "/refresh")
    public Token refreshToken(@RequestHeader("Authorization") String authorizationHeader){
       return userService.refreshToken(authorizationHeader);
    }

    @PatchMapping(value = "/edit")
    public UserDTO editUser(@RequestHeader("Authorization") String authorizationHeader, @RequestBody User user){
        return userService.editUser(authorizationHeader, user);
    }
}
