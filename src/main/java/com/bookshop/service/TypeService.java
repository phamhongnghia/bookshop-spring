package com.bookshop.service;

import com.bookshop.dto.TypeDto;
import com.bookshop.entity.Type;

import java.util.List;

public interface TypeService {
    List<TypeDto> findAllType();

    void saveType(TypeDto typeDto);
}
