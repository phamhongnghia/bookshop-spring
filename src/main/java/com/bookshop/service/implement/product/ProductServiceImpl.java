package com.bookshop.service.implement.product;

import com.bookshop.convert.ConvertProduct;
import com.bookshop.dto.DetailProductDto;
import com.bookshop.dto.ProductDto;
import com.bookshop.entity.DetailProduct;
import com.bookshop.entity.Product;
import com.bookshop.entity.Type;
import com.bookshop.repository.DetailProductRepository;
import com.bookshop.repository.ProductRepository;
import com.bookshop.repository.TypeRepository;
import com.bookshop.service.ProductService;
import com.bookshop.utils.ListConstantEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository m_productRepo;

    @Autowired
    private ConvertProduct m_convertProduct;

    @Autowired
    private TypeRepository m_typeRepo;

    @Autowired
    DetailProductRepository m_detailProductRepo;

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

    @Override
    public String addProduct(ProductDto productDto) {
        Product product = m_convertProduct.convertToEntity(productDto);
        m_productRepo.save(product);
        return ListConstantEnum.MESSAGE_SUCCESS.getName();
    }

    @Override
    public String updateProduct(ProductDto productDto) {
        String message = null;
        if(productDto.getProductCode() != null){
            Product product = m_productRepo.getById(productDto.getProductCode());
            if(product != null){
                if(productDto.getCost() != null){
                    product.setCost(productDto.getCost());
                }
                if(productDto.getDiscount() != null){
                    product.setDiscount(productDto.getDiscount());
                }
                if(productDto.getProductImage() != null){
                    product.setProductImage(productDto.getProductImage());
                }
                if(productDto.getProductName() != null){
                    product.setProductName(productDto.getProductName());
                }
                if(productDto.getProductStatus() != null){
                    product.setProductStatus(productDto.getProductStatus());
                }
                if(productDto.getTypeCode() != null){
                    Type type = m_typeRepo.getById(productDto.getTypeCode());
                    product.setType(type);
                }
                m_productRepo.save(product);
                message = ListConstantEnum.MESSAGE_SUCCESS.getName();
            }else {
                message = ListConstantEnum.MESSAGE_NOT_EXIST_PRODUCT.getName();
            }
        }else {
            message = ListConstantEnum.MESSAGE_FAIL.getName();
        }
        return message;
    }


}
