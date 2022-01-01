package com.bookshop.api.user;

import com.bookshop.dto.UserDto;
import com.bookshop.entity.User;
import com.bookshop.service.UserService;
import com.bookshop.utils.ListConstantEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserApi {

    @Autowired
    private UserService m_userService;

    @RequestMapping(value = "/create-user", method = RequestMethod.POST)
    public String createUser(@RequestBody UserDto userDto){
        return m_userService.createUser(userDto);
    }

    @RequestMapping(value = "/update-user", method = RequestMethod.POST)
    public String updateUser(@RequestBody UserDto userDto){
        return m_userService.updateUser(userDto);
    }

    @RequestMapping(value = "/info-user/{userName}", method = RequestMethod.GET)
    public UserDto findUser(@PathVariable String userName){
        UserDto userDto = new UserDto();
        if(userName != null){
            userDto = m_userService.findUser(userName);
            userDto.setMessage(ListConstantEnum.MESSAGE_SUCCESS.getName());
        }else {
            userDto.setMessage(ListConstantEnum.MESSAGE_FAIL.getName());
        }
        return userDto;
    }

    @RequestMapping(value = "/all-user", method = RequestMethod.GET)
    public List<UserDto> findAllUser(){
        return m_userService.findAllUser();
    }

}
