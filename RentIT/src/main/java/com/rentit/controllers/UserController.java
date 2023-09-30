package com.rentit.controllers;

import com.rentit.model.Token;
import com.rentit.model.User;
import com.rentit.services.TokenService;
import com.rentit.services.UserService;
import com.rentit.services.enums.ResponseMessage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    TokenService tokenService;

    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes="application/json")
    public void registerUser(@RequestBody User user, HttpServletResponse response) throws IOException {
        ResponseMessage responseMessage = userService.registerUser(user);
        switch (responseMessage) {
            case SUCCESS -> setResponse(response, true);
            case PASSWORD_ERROR -> response.sendError(401, "Password does not match");
            case EXISTING_USERNAME -> response.sendError(401, "Account with this username already exists");
            case EXISTING_EMAIL -> response.sendError(401, "Account with this email already exists");
            default -> response.sendError(500, "Internal server error");
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes="application/json")
    public Token loginUser(@RequestBody User user, Authentication authentication, HttpServletResponse response) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {
        ResponseMessage responseMessage = userService.loginUser(user);
        switch (responseMessage) {
            case SUCCESS ->{
                return Token.builder().tokenName("Authentication").tokenBody(tokenService.generateToken(authentication)).build();
            }
            case CREDENTIALS_ERROR -> response.sendError(401, "Make sure the password matches requirements");
            default -> response.sendError(500, "Internal server error");
        }
        return Token.builder().build();
    }

    public void setResponse(HttpServletResponse response, boolean success){
        if(success){
            response.setStatus(HttpStatus.OK.value());
        }
        else {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
        }
    }
}
