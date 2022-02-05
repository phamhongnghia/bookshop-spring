package com.bookshop.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "type")
public class Type{

    @Id
    @Column(name = "typeCode")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer typeCode;
    @Column(name = "typeName")
    private String typeName;

    @OneToMany(mappedBy = "type")
    private List<Product> products = new ArrayList<>();

    public Integer getTypeCode() {
        return typeCode;
    }

    public void setTypeCode(Integer typeCode) {
        this.typeCode = typeCode;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    /*public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }*/

}
