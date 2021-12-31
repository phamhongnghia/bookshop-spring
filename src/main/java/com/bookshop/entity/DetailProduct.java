package com.bookshop.entity;

import javax.persistence.*;

@Entity
@Table(name = "detail_product")
public class DetailProduct extends BaseEntity{

    @Column(name = "supplier")
    private String supplier;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "author")
    private String author;
    @Column(name = "form_product")
    private String formProduct;
    @Column(name = "translator")
    private String translator;
    @Column(name = "description")
    private String description;
    @Column(name = "content_product")
    private String contentProduct;
    @Column(name = "publishing_year")
    private String publishingYear;
    @Column(name = "weight_product")
    private String weightProduct;
    @Column(name = "number_of_pages")
    private String numberOfPages;

    // Mapping table
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_code")
    private Type type;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_code")
    private Product product;

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getFormProduct() {
        return formProduct;
    }

    public void setFormProduct(String formProduct) {
        this.formProduct = formProduct;
    }

    public String getTranslator() {
        return translator;
    }

    public void setTranslator(String translator) {
        this.translator = translator;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContentProduct() {
        return contentProduct;
    }

    public void setContentProduct(String contentProduct) {
        this.contentProduct = contentProduct;
    }

    public String getPublishingYear() {
        return publishingYear;
    }

    public void setPublishingYear(String publishingYear) {
        this.publishingYear = publishingYear;
    }

    public String getWeightProduct() {
        return weightProduct;
    }

    public void setWeightProduct(String weightProduct) {
        this.weightProduct = weightProduct;
    }

    public String getNumberOfPages() {
        return numberOfPages;
    }

    public void setNumberOfPages(String numberOfPages) {
        this.numberOfPages = numberOfPages;
    }

    /*public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }*/

    /*public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }*/

}
