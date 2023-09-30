package com.rentit.dao.interfaces;

import com.rentit.model.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IUserMapper {
    User getUserByEmail(String email);
    User getUserById(long id);
    void registerUser(User user);
}
