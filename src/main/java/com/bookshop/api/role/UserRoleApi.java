package com.bookshop.api.role;

import com.bookshop.dto.UserRoleDto;
import com.bookshop.repository.UserRoleRepository;
import com.bookshop.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRoleApi {

    @Autowired
    private UserRoleService m_userRoleService;

    @RequestMapping(value = "/get-role", method = RequestMethod.GET)
    public List<UserRoleDto> findAllUserRole(){
        List<UserRoleDto> listUserRole = m_userRoleService.findAllUserRole();
        return listUserRole;
    }

    @RequestMapping(value = "/add-role", method = RequestMethod.POST)
    public String saveUserRole(@RequestBody UserRoleDto userRoleDto){
        return m_userRoleService.addUserRole(userRoleDto);
    }

    @RequestMapping(value = "/delete-role/{roleId}")
    public String deleteUserRole(@PathVariable Integer roleId){
        return m_userRoleService.deleteUserRole(roleId);
    }

    @RequestMapping(value = "/update-role", method = RequestMethod.POST)
    public String updateUserRole(@RequestBody UserRoleDto userRoleDto){
        return m_userRoleService.updateUserRole(userRoleDto, userRoleDto.getRoleId());
    }

}
