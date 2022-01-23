package com.bookshop.service;

import com.bookshop.dto.UserDto;

import java.util.List;

public interface UserService {
    String createUser(UserDto userDto);
    String updateUser(UserDto userDto);
    UserDto findByUsernameAndPassword(String username, String password);
    List<UserDto> findAllUser();
}
