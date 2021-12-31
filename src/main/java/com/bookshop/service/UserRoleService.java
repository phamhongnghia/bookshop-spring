package com.bookshop.service;

import com.bookshop.dto.UserRoleDto;
import com.bookshop.entity.UserRole;

import java.util.List;

public interface UserRoleService {
    String addUserRole(UserRoleDto userRoleDto);
    String deleteUserRole(Integer id);
    String updateUserRole(UserRoleDto userRoleDto, Integer id);
    List<UserRoleDto> findAllUserRole();
}
