package com.bookshop.service.implement.user;

import com.bookshop.convert.ConvertUser;
import com.bookshop.dto.UserDto;
import com.bookshop.entity.User;
import com.bookshop.entity.UserRole;
import com.bookshop.repository.UserRepository;
import com.bookshop.repository.UserRoleRepository;
import com.bookshop.service.UserService;
import com.bookshop.utils.ListConstantEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ConvertUser m_convertUser;

    @Autowired
    private UserRepository m_userRepo;

    @Autowired
    private UserRoleRepository m_userRoleRepo;

    public UserServiceImpl(UserRepository userRepository, ConvertUser convertUser){
        m_userRepo = userRepository;
        m_convertUser = convertUser;
    }

    @Override
    public String createUser(UserDto userDto) {
        String message = null;
        User user = m_convertUser.convertToEntity(userDto);
        UserRole userRole = m_userRoleRepo.findById(userDto.getRoleId()).get();
        user.setUser_role(userRole);
        if(user.getUsername() != null){
            if(m_userRepo.findById(user.getUsername()).isPresent()){
                message = ListConstantEnum.MESSAGE_EXIST_USER.getName();
            }else {
                m_userRepo.save(user);
                message = ListConstantEnum.MESSAGE_SUCCESS.getName();
            }
        }else {
            message = ListConstantEnum.MESSAGE_FAIL.getName();
        }
        return message;
    }

    @Override
    public String updateUser(UserDto userDto) {
        User user = m_userRepo.findById(userDto.getUsername()).get();
        user.setUsername(userDto.getUsername());
        user.setImageUser(userDto.getImageUser());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setFullName(userDto.getFullName());
        user.setAddress(userDto.getAddress());
        m_userRepo.save(user);
        return ListConstantEnum.MESSAGE_SUCCESS.getName();
    }

    @Override
    public UserDto findByUsernameAndPassword(String username, String password) {
        User user = m_userRepo.findByUsernameAndPassword(username, password);
        UserDto userDto = new UserDto();
        if(user != null){
            userDto.setMessage(ListConstantEnum.MESSAGE_SUCCESS.getName());
            userDto = m_convertUser.convertToDto(user);
        }else {
            userDto.setMessage(ListConstantEnum.MESSAGE_FAIL.getName());
        }
        return userDto;
    }

    @Override
    public List<UserDto> findAllUser() {
        List<UserDto> listUserDto = new ArrayList<>();
        List<User> listUser = m_userRepo.findAll();
        for(User user : listUser){
            UserDto userDto = m_convertUser.convertToDto(user);
            listUserDto.add(userDto);
        }
        return listUserDto;
    }

}
