package com.rentit.controllers;

import com.rentit.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    TokenService tokenService;
    @GetMapping
    public String home(Principal principal) {
        return "Test " + principal.getName();
    }
    @PostMapping("/token")
    public String tokenTest(@RequestBody String token) {
        return tokenService.decodeToken(token, "sub");
    }
}
