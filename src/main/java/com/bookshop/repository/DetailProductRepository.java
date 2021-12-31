package com.bookshop.repository;

import com.bookshop.entity.DetailProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailProductRepository extends JpaRepository<DetailProduct, Long> {
}