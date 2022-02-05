package com.bookshop.api.product.singleProduct;


import com.bookshop.dto.ProductDto;
import com.bookshop.dto.singleProduct.SingleProductDto;
import com.bookshop.entity.DetailProduct;
import com.bookshop.entity.Product;
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

    /*@RequestMapping(value = "/detail-product/{id}", method = RequestMethod.GET)
    public DetailProduct findDetailProduct(@PathVariable Integer id){
        return m_productService.findDetailProduct(id);
    }*/
}
