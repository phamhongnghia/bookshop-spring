package com.bookshop.convert;

import com.bookshop.dto.UserRoleDto;
import com.bookshop.entity.UserRole;
import org.springframework.stereotype.Controller;

@Controller
public class ConvertUserRole {

    public UserRoleDto convertToDto(UserRole userRole){
        UserRoleDto userRoleDto = new UserRoleDto();
        userRoleDto.setRoleId(userRole.getRoleId());
        userRoleDto.setRoleName(userRole.getRoleName());
        return userRoleDto;
    }

    public UserRole convertToEntity(UserRoleDto userRoleDto){
        UserRole userRole = new UserRole();
        userRole.setRoleName(userRoleDto.getRoleName());
        return userRole;
    }

}
