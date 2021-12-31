package com.bookshop.service;

import com.bookshop.dto.ProductDto;
import com.bookshop.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAllProduct();

    ProductDto findByProductCode(Integer id);
}
