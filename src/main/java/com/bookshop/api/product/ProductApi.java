package com.bookshop.api.product;

import com.bookshop.dto.ProductDto;
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

    @GetMapping("/list-product")
    public List<Product> findAllProduct(){
        return m_productService.findAllProduct();
    }

    // add product
    @RequestMapping(value = "/add-product", method = RequestMethod.POST)
    public String addProduct(@RequestBody ProductDto productDto){
        return m_productService.addProduct(productDto);
    }

    // update product
    @RequestMapping(value = "/update-product", method = RequestMethod.PUT)
    public String updateProduct(@RequestBody ProductDto productDto){
        return m_productService.updateProduct(productDto);
    }
}
