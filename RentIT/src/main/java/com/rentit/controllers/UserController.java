package com.rentit.controllers;

import com.rentit.model.Token;
import com.rentit.model.User;
import com.rentit.model.dto.UserDTO;
import com.rentit.services.UserService;
import com.rentit.services.enums.ResponseMessage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = "application/json")
    public void registerUser(@RequestBody User user, HttpServletResponse response) throws IOException {
        ResponseMessage responseMessage = userService.registerUser(user);
        switch (responseMessage) {
            case SUCCESS -> setResponse(response, true);
            case PASSWORD_ERROR -> response.sendError(400, "Password does not match requirements");
            case EXISTING_EMAIL -> response.sendError(400, "Account with this email already exists");
            default -> response.sendError(500, "Internal server error");
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = "application/json")
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

    @RequestMapping(value = "/getUser", method = RequestMethod.GET)
    public UserDTO getUser(@RequestHeader("Authorization") String authorizationHeader) {
        return userService.getUser(authorizationHeader);
    }

    public void setResponse(HttpServletResponse response, boolean success) {
        if (success) {
            response.setStatus(HttpStatus.OK.value());
        } else {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
        }
    }
}
