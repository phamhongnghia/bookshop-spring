package com.bookshop.service.implement.product;

import com.bookshop.convert.ConvertProduct;
import com.bookshop.dto.ProductDto;
import com.bookshop.entity.Product;
import com.bookshop.repository.ProductRepository;
import com.bookshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository m_productRepo;

    @Autowired
    private ConvertProduct m_convertProduct;

    @Override
    public List<Product> findAllProduct() {
        return m_productRepo.findAll();
    }

    @Override
    public ProductDto findByProductCode(Integer id) {
        Product product = m_productRepo.findById(id).get();
        ProductDto productDto = m_convertProduct.convertToDto(product);
        return productDto;
    }
}
