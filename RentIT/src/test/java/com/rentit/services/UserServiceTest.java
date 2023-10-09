package com.rentit.services;

import com.rentit.dao.interfaces.IUserMapper;
import com.rentit.model.User;
import com.rentit.services.enums.ResponseMessage;
import com.rentit.utils.HashUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private HashUtil hashUtil;
    @Mock
    private IUserMapper userMapper;
    @Mock
    private TokenService tokenService;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    public void beforeEach(){
        user = User.builder().email("testemail@gmail.com").password("RealStrongPassword1!").build();
    }

    @Test
    public void registerUserTest(){
        when(userMapper.getUserByEmail(anyString())).thenReturn(null);
        ResponseMessage response = userService.registerUser(user);
        assertEquals(response,ResponseMessage.SUCCESS);
    }

    @Test
    public void registerUserTestEmailError(){
        when(userMapper.getUserByEmail(anyString())).thenReturn(User.builder().email("testemail@gmail.com").password("RealStrongPassword1!").build());
        ResponseMessage response = userService.registerUser(user);
        assertEquals(response,ResponseMessage.EXISTING_EMAIL);
    }

    @Test
    public void registerUserTestPasswordError(){
        when(userMapper.getUserByEmail(anyString())).thenReturn(null);
        user.setPassword("testweakpassword");
        ResponseMessage response = userService.registerUser(user);
        assertEquals(response, ResponseMessage.PASSWORD_ERROR);
    }

    @Test
    public void registerUserTestNullUserError(){
        ResponseMessage response = userService.registerUser(null);
        assertEquals(response, ResponseMessage.INTERNAL_ERROR);
    }
}
