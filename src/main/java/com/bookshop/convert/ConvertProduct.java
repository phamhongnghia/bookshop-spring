package com.bookshop.convert;

import com.bookshop.dto.ProductDto;
import com.bookshop.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ConvertProduct {
    public Product convertToEntity(ProductDto productDto){
        Product product = new Product();
        product.setProductCode(productDto.getProductCode());
        //product.setTypeCode(productDto.getTypeCode());
        product.setProductName(productDto.getProductName());
        product.setProductImage(productDto.getProductImage());
        product.setCost(productDto.getCost());
        product.setDiscount(productDto.getDiscount());
        product.setProductStatus(productDto.getProductStatus());
        return product;
    }

    public ProductDto convertToDto(Product product){
        ProductDto productDto = new ProductDto();
        productDto.setProductCode(product.getProductCode());
        //productDto.setTypeCode(product.getTypeCode());
        productDto.setProductName(product.getProductName());
        productDto.setProductImage(product.getProductImage());
        productDto.setCost(product.getCost());
        productDto.setDiscount(product.getDiscount());
        productDto.setProductStatus(product.getProductStatus());
        return productDto;
    }
}
