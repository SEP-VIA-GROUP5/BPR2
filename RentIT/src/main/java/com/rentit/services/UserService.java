package com.rentit.services;

import com.rentit.dao.interfaces.IUserMapper;
import com.rentit.model.Token;
import com.rentit.model.User;
import com.rentit.services.enums.ResponseMessage;
import com.rentit.utils.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class UserService {
    @Autowired
    private HashUtil hashUtil;

    @Autowired
    private IUserMapper userMapper;

    @Autowired
    private TokenService tokenService;

    public ResponseMessage loginUser(User user) {
        if (user != null) {
            if (user.getEmail() != null) {
                User dbUser = userMapper.getUserByEmail(user.getEmail());
                if (dbUser == null) {
                    return ResponseMessage.CREDENTIALS_ERROR;
                }
                if (Arrays.equals(hashUtil.hash(user.getPassword(), dbUser.getHashedPassword().getSalt()).getHashedString(),
                        dbUser.getHashedPassword().getHashedString())) {
                    return ResponseMessage.SUCCESS;
                } else {
                    return ResponseMessage.CREDENTIALS_ERROR;
                }
            }
        }
        return ResponseMessage.INTERNAL_ERROR;
    }

    public ResponseMessage registerUser(User user) {
        if (user != null) {
            if (userMapper.getUserByEmail(user.getEmail()) != null) {
                return ResponseMessage.EXISTING_EMAIL;
            }
            if (!user.getPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")) {
                return ResponseMessage.PASSWORD_ERROR;
            }
            user.setHashedPassword(hashUtil.hash(user.getPassword(), null));
            userMapper.registerUser(user);
            return ResponseMessage.SUCCESS;
        }
        return ResponseMessage.INTERNAL_ERROR;
    }

    public Token authenticateUser(User user) {
        List<GrantedAuthority> grantedAuths = new ArrayList<>();
        grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
        Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword(), grantedAuths);
        Instant expires = Instant.now().plus(TokenService.duration, ChronoUnit.HOURS);
        return Token.builder().tokenName("Authentication").tokenBody(tokenService.generateToken(auth)).expires(expires).build();
    }
}