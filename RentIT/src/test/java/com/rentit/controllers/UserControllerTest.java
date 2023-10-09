package com.rentit.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rentit.model.User;
import com.rentit.services.UserService;
import com.rentit.services.enums.ResponseMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService service;

    private User user;

    @BeforeEach
    void beforeEach() {
        user = User.builder()
                .email("testemail@gmail.com")
                .firstName("Test name")
                .lastName("Test lastname")
                .location("Test city")
                .phoneNumber("123")
                .password("test password")
                .build();
    }

    @Test
    public void testRegisterUser() throws Exception {
        when(service.registerUser(user)).thenReturn(ResponseMessage.SUCCESS);
        this.mvc.perform(post("http://localhost:8080/user/register")
                .content(new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(user))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void testRegisterUserErrors() throws Exception {
        when(service.registerUser(user)).thenReturn(ResponseMessage.PASSWORD_ERROR);
        this.mvc.perform(post("http://localhost:8080/user/register")
                        .content(new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
        when(service.registerUser(user)).thenReturn(ResponseMessage.EXISTING_EMAIL);
        this.mvc.perform(post("http://localhost:8080/user/register")
                        .content(new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testLoginUser() throws Exception {
        when(service.loginUser(user)).thenReturn(ResponseMessage.SUCCESS);
        this.mvc.perform(post("http://localhost:8080/user/login")
                        .content(new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginUserErrors() throws Exception {
        when(service.loginUser(user)).thenReturn(ResponseMessage.CREDENTIALS_ERROR);
        this.mvc.perform(post("http://localhost:8080/user/login")
                        .content(new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
