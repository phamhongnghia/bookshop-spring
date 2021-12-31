package com.bookshop.api.single;

import com.bookshop.convert.ConvertType;
import com.bookshop.dto.TypeDto;
import com.bookshop.entity.Type;
import com.bookshop.service.TypeService;
import org.springframework.beans.TypeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TypeApi {

    @Autowired
    private TypeService m_typeService;

    @RequestMapping(value = "/type", method = RequestMethod.GET)
    public List<TypeDto> listType(){
        List<TypeDto> listType = m_typeService.findAllType();
        return listType;
    }

    @RequestMapping(value = "/add-type", method = RequestMethod.POST, produces = "application/json")
    public String saveType(@RequestBody TypeDto typeDto){
        String message;
        m_typeService.saveType(typeDto);
        return "message";
    }

}
