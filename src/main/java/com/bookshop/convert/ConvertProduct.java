package com.bookshop.convert;

import com.bookshop.dto.ProductDto;
import com.bookshop.entity.Product;
import com.bookshop.entity.Type;
import com.bookshop.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConvertProduct {
    @Autowired
    private TypeRepository m_typeRepo;

    public Product convertToEntity(ProductDto productDto){
        Product product = new Product();
        product.setProductCode(productDto.getProductCode());
        Type type = m_typeRepo.getById(productDto.getTypeCode());
        product.setType(type);
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
