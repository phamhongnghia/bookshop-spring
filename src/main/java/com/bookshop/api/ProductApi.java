package com.bookshop.api;

import com.bookshop.entity.Product;
import com.bookshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductApi {

    @Autowired
    private ProductService m_productService;

    @GetMapping("/listProduct")
    public List<Product> findAllProduct(){
        return m_productService.findAllProduct();
    }
}
