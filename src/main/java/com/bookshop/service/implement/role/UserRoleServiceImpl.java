package com.bookshop.service.implement.role;

import com.bookshop.convert.ConvertUserRole;
import com.bookshop.dto.UserRoleDto;
import com.bookshop.entity.UserRole;
import com.bookshop.repository.UserRoleRepository;
import com.bookshop.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    private String MESSAGE_SUCCESS = "SUCCESS";
    private String MESSAGE_FAIL = "FAIL";

    @Autowired
    private UserRoleRepository m_userRoleRepo;

    @Autowired
    private ConvertUserRole m_convertUserRole;

    @Override
    public String addUserRole(UserRoleDto userRoleDto) {
        UserRole userRole = m_convertUserRole.convertToEntity(userRoleDto);
        String message = null;
        if(userRole != null){
            m_userRoleRepo.save(userRole);
            message = MESSAGE_SUCCESS;
        }else {
            message = MESSAGE_FAIL;
        }
        return message;
    }

    @Override
    public String deleteUserRole(Integer id) {
        String message = null;
        if(id != null){
            m_userRoleRepo.deleteById(id);
            message = MESSAGE_SUCCESS;
        }else {
            message = MESSAGE_FAIL;
        }
        return message;
    }

    @Override
    public String updateUserRole(UserRoleDto userRoleDto, Integer id) {
        String message = null;
        if(userRoleDto != null){
            UserRole userRole = m_userRoleRepo.findById(id).get();
            userRole.setRoleId(userRoleDto.getRoleId());
            userRole.setRoleName(userRoleDto.getRoleName());
            m_userRoleRepo.save(userRole);
            message = MESSAGE_SUCCESS;
        }else {
            message = MESSAGE_FAIL;
        }
        return message;
    }

    @Override
    public List<UserRoleDto> findAllUserRole() {
        List<UserRoleDto> listUserRoleDto = new ArrayList<>();
        List<UserRole> listUserRole = m_userRoleRepo.findAll();
        for(UserRole userRole : listUserRole){
            UserRoleDto userRoleDto = new UserRoleDto();
            userRoleDto = m_convertUserRole.convertToDto(userRole);
            listUserRoleDto.add(userRoleDto);
        }
        return listUserRoleDto;
    }
}
