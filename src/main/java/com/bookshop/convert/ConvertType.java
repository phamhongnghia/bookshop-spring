package com.bookshop.convert;

import com.bookshop.dto.TypeDto;
import com.bookshop.entity.Type;
import org.springframework.stereotype.Component;

@Component
public class ConvertType {

    public Type convertToEntity(TypeDto typeDto){
        Type type = new Type();
        type.setTypeName(typeDto.getTypeName());
        return type;
    }

    public TypeDto convertToDto(Type type){
        TypeDto typeDto = new TypeDto();
        typeDto.setTypeCode(type.getTypeCode());
        typeDto.setTypeName(type.getTypeName());
        return typeDto;
    }

}
