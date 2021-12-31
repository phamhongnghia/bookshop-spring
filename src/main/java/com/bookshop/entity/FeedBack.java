package com.bookshop.entity;

import javax.persistence.*;

@Entity
@Table(name = "feedback")
public class FeedBack extends BaseEntity{

    @Column(name = "content")
    private String content;

    @Column(name = "create_day")
    private String createDay;

    @OneToOne
    @JoinColumn(name = "username")
    private User user;

    @OneToOne
    @JoinColumn(name = "product_code")
    private Product product;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreateDay() {
        return createDay;
    }

    public void setCreateDay(String createDay) {
        this.createDay = createDay;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
