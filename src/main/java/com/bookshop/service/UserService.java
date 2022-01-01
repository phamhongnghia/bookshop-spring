package com.bookshop.service;

import com.bookshop.dto.UserDto;

import java.util.List;

public interface UserService {
    String createUser(UserDto userDto);
    String updateUser(UserDto userDto);
    UserDto findUser(String userName);
    List<UserDto> findAllUser();
}
