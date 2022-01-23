package com.bookshop.convert;

import com.bookshop.dto.UserDto;
import com.bookshop.entity.User;
import org.springframework.stereotype.Controller;

@Controller
public class ConvertUser {

    public UserDto convertToDto(User user){
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setImageUser(user.getImageUser());
        userDto.setAddress(user.getAddress());
        userDto.setFullName(user.getFullName());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setRoleName(user.getUser_role().getRoleName());
        return userDto;
    }

    public User convertToEntity(UserDto userDto){
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setImageUser(userDto.getImageUser());
        user.setFullName(userDto.getFullName());
        user.setAddress(userDto.getAddress());
        user.setPhoneNumber(userDto.getPhoneNumber());
        return user;
    }

}
