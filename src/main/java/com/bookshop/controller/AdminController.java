package com.bookshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    @GetMapping("/admin")
    public String admin(){
        return "admin";
    }

    @GetMapping("/login-admin")
    public String loginAdmin(){
        return "login-admin";
    }

}
