package com.bookshop.service.implement.product;

import com.bookshop.convert.ConvertType;
import com.bookshop.dto.TypeDto;
import com.bookshop.entity.Type;
import com.bookshop.repository.TypeRepository;
import com.bookshop.service.TypeService;
import com.bookshop.utils.ListConstantEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TypeServiceImpl implements TypeService {

    @Autowired
    private TypeRepository m_typeRepo;

    @Autowired
    private ConvertType m_convertType;

    @Override
    public List<TypeDto> findAllType() {
        List<Type> listType = m_typeRepo.findAll();
        List<TypeDto> listTypeDto = new ArrayList<>();
        for (Type type : listType){
            listTypeDto.add(m_convertType.convertToDto(type));
        }
        return listTypeDto;
    }

    @Override
    public String addType(TypeDto typeDto) {
        Type type = m_convertType.convertToEntity(typeDto);
        m_typeRepo.save(type);
        return ListConstantEnum.MESSAGE_SUCCESS.getName();
    }
}
