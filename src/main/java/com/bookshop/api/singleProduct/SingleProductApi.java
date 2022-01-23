package com.bookshop.api.singleProduct;


import com.bookshop.dto.ProductDto;
import com.bookshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SingleProductApi {

    @Autowired
    private ProductService m_productService;

    @RequestMapping(value = "/single-product/{productCode}", method = RequestMethod.GET)
    public ProductDto singleProduct(@PathVariable Integer productCode){
        return m_productService.findByProductCode(productCode);
    }

}
