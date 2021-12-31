package com.bookshop.entity;

import javax.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    @Column(name = "product_code", nullable = false)
    private Integer productCode;
    @Column(name = "dem")
    private Integer dem;
    @Column(name = "product_name")
    private String productName;
    @Column(name = "product_image")
    private String productImage;
    @Column(name = "cost")
    private Integer cost;
    @Column(name = "discount")
    private Integer discount;
    @Column(name = "product_status")
    private String productStatus;

    @OneToOne(mappedBy = "product")
    private DetailProduct detailProduct;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_code", nullable = false)
    private Type type;

    @OneToOne(mappedBy = "product")
    private ProductCart product_cart;

    public ProductCart getProduct_cart() {
        return product_cart;
    }

    public void setProduct_cart(ProductCart product_cart) {
        this.product_cart = product_cart;
    }

    public Integer getProductCode() {
        return productCode;
    }

    public void setProductCode(Integer productCode) {
        this.productCode = productCode;
    }

    public Integer getDem() {
        return dem;
    }

    public void setDem(Integer dem) {
        this.dem = dem;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(String productStatus) {
        this.productStatus = productStatus;
    }

    public DetailProduct getDetailProduct() {
        return detailProduct;
    }

    public void setDetailProduct(DetailProduct detailProduct) {
        this.detailProduct = detailProduct;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

}
