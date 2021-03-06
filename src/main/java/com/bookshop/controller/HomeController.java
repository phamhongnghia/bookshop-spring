package com.bookshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index(Model model){
        return "index";
    }

    @GetMapping("/single-product/{productCode}")
    public String singleProduct(){
        return "singleProduct";
    }

    @GetMapping("/login")
    public String loginPage(){
        return "register";
    }

}
