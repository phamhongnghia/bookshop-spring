package com.bookshop.service;

import com.bookshop.dto.ProductDto;
import com.bookshop.entity.DetailProduct;
import com.bookshop.entity.Product;

import java.util.List;

public interface ProductService {
    // get all product
    List<Product> findAllProduct();
    //find product by product code
    ProductDto findByProductCode(Integer id);
    // add product
    String addProduct(ProductDto productDto);
    // update product
    String updateProduct(ProductDto productDto);
}
