package com.rentit.mappers;

import com.rentit.dao.interfaces.IUserMapper;
import com.rentit.model.HashPair;
import com.rentit.model.User;
import com.rentit.utils.HashUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IUserMapperTest {

    @Autowired
    private IUserMapper userMapper;
    @Autowired
    private HashUtil hashUtil;

    @Test
    public void getUserByEmail_returns_correct_user() {
        String email = "daniel.grøn@example.com";
        User user = userMapper.getUserByEmail(email);
        assertThat(user.getEmail()).isEqualTo(email);
    }

    @Test
    public void getUserByEmail_returns_null_with_incorrect_email() {
        String email = "wrongEmail";
        User user = userMapper.getUserByEmail(email);
        assertThat(user).isEqualTo(null);
    }

    @Test
    public void getUserById_returns_correct_user() {
        int id = 1;
        User user = userMapper.getUserById(id);
        assertThat(user.getId()).isEqualTo(id);
    }

    @Test
    public void getUserById_returns_null_with_incorrect_id() {
        int id = 10;
        User user = userMapper.getUserById(id);
        assertThat(user).isNull();
    }

    @Test
    public void registerUser_correctly_inserts_user() {
        String password = "password";
        String email = "johndoe@email.com";
        HashPair hashPair = hashUtil.hash(password, null);
        User user = User.builder()
                .id(7)
                .email(email)
                .firstName("John")
                .lastName("Doe")
                .phoneNumber("+458656554")
                .location("Horsens")
                .password(password)
                .hashedPassword(hashPair)
                .build();
        userMapper.registerUser(user);
        User registeredUser = userMapper.getUserByEmail(email);
        //We save only hashed password in db
        user.setPassword(null);
        assertThat(registeredUser).isEqualTo(user);
    }

    @Test
    public void updateUserProfile_updates_user_in_db() {
        String oldEmail = "aslan.grøn@example.com";
        String newEmail = "emailUpdated";
        HashPair updatedHashPair = hashUtil.hash("passwordUpdated", null);
        User updatedUser = User.builder()
                .id(6)
                .firstName("fNameUpdated")
                .lastName("lNameUpdated")
                .phoneNumber("741")
                .email(newEmail)
                .location("locationUpdated")
                .hashedPassword(updatedHashPair)
                .build();
        assertThat(userMapper.getUserByEmail(oldEmail)).isNotEqualTo(updatedUser);
        userMapper.updateUserProfile(updatedUser);
        assertThat(userMapper.getUserByEmail(newEmail)).isEqualTo(updatedUser);
    }
}
