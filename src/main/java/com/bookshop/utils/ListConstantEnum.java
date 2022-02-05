package com.bookshop.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum ListConstantEnum {
    MESSAGE_SUCCESS("SUCCESS"),
    MESSAGE_FAIL("FAIL"),
    MESSAGE_EXIST_USER("USER EXIST"),
    MESSAGE_NOT_EXIST_PRODUCT("NOT EXIST PRODUCT");

    private final String m_name;

    private ListConstantEnum(String name) {
        m_name = name;
    }

    public String getName(){
        return m_name;
    }

    private static final Map<String, ListConstantEnum> m_enums = new HashMap();

    static {
        m_enums.put("SUCCESS", MESSAGE_SUCCESS);
        m_enums.put("FAIL", MESSAGE_FAIL);
        m_enums.put("USER EXIST", MESSAGE_EXIST_USER);
        m_enums.put("NOT EXIST PRODUCT", MESSAGE_NOT_EXIST_PRODUCT);
    }
}
