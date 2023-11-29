package com.rentit.dao.interfaces;

import com.rentit.model.User;
import com.rentit.model.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IUserMapper {
    User getUserByEmail(String email);
    User getUserToEditById(int id);
    User getUserById(int id);
    UserDTO getUserDTOById(int id);
    void registerUser(User user);
    void updateUserProfile(User user);
}
