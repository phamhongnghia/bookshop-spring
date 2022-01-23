$(document).ready(function () {
    loadCategories();
    var n = 6;
    loadShopGrid(n);
});

function loadShopGrid(n) {

    // Get url

    var url = window.location.href.split("?t=");
    dem = 0;

    // Load Breadcrumb

    $('.breadcrumb').empty();
    $('.grid__product').empty();
    $('.view__more__shop').empty();
    if (url[1] == "KTE_TLH") {

        // Load title
        $('title').text("Kinh tế - Tâm lý học");
        var ol = $(`
            <li class="breadcrumb-item"><a class="text-white" href="index.jsp">Trang chủ</a></li>
            <li class="breadcrumb-item title__breadcrumb"><a href="shop-grid.jsp?t=${url[1]}">Kinh tế - Tâm lý học</a></li>
	`);
        $('.breadcrumb').append(ol);
    } else {
        $.ajax({
            url: "ListType",
            method: "GET"
        }).done(function (response) {
            var arr = new Array();
            $.each(response, function (index, item) {
                arr.push(item);
            });
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].maloai == url[1]) {

                    // Load title

                    $('title').text(arr[i].tenloai);

                    var ol = $(`
                        <li class="breadcrumb-item"><a class="text-white" href="index.jsp">Trang chủ</a></li>
                        <li class="breadcrumb-item"><a href="shop-grid.jsp?t=${arr[i].maloai}">${arr[i].tenloai}</a></li>
                    `);
                    $('.breadcrumb').append(ol);
                }
            }
        });
    }

    // Load Shop grid product
    $.ajax({
        url: "ProductServ",
        method: "GET"
    }).done(function (response) {
        var list = new Array();
        $.each(response, function (index, item) {
            list.push(item);
        });
        var sum = 0;
        if (url[1] == "KTE_TLH") {
            dem = 0;
            for (var i = 0; i < list.length; i++) {
                if (dem == n) {
                    continue;
                } else {
                    if (list[i].maloai == "KTE" || list[i].maloai == "TLH") {
                        let thanhtien = 0;
                        let giagoc = 0;
                        if (list[i].giamgia == 0) {
                            list[i].giamgia = "";
                            thanhtien = fomatter.format(list[i].giagoc);
                            giagoc = "";
                        } else {
                            thanhtien = fomatter.format(list[i].giagoc - (list[i].giagoc * list[i].giamgia) / 100);
                            list[i].giamgia = list[i].giamgia + "%";
                            giagoc = fomatter.format(list[i].giagoc);
                        }
                        var el = $(`
                            <div class="product__woo">
                                <div class="product__img">
                                    <img src="static/image/product/big_img/${list[i].hinhanh}" alt="">
                                </div>
                                <div class="product__text pt-2 text-center">
                                    <a href="single-product.jsp?masp=${list[i].masp}">${list[i].tensp}</a>
                                </div>
                                <div class="product__cart">
                                    <i class="fa fa-shopping-cart" onclick="addCart('${list[i].masp}')" aria-hidden="true"></i>
                                </div>
                                <div class="product__price">
                                    <label>${thanhtien}</label>
                                    <span class="giasp mx-2">${giagoc}</span>
                                    <span class="giasp mx-2">${list[i].giamgia}</span>
                                </div>
                            </div>
                        `);
                        $('.grid__product').append(el);
                        dem++;
                        sum = sum + 1;
                    }
                }
            }
            let getGiaSP = document.getElementsByClassName("giasp");
            for (let i = 0; i < getGiaSP.length; i++) {
                if (getGiaSP[i].innerHTML == "") {
                    getGiaSP[i].style.display = "none";
                }
            }
        } else {
            dem = 0;
            sum = 0;
            for (var i = 0; i < list.length; i++) {
                if (dem == n) {
                    continue;
                } else {
                    if (list[i].maloai == url[1]) {
                        let thanhtien = 0;
                        let giagoc = 0;
                        if (list[i].giamgia == 0) {
                            list[i].giamgia = "";
                            thanhtien = fomatter.format(list[i].giagoc);
                            giagoc = "";
                        } else {
                            thanhtien = fomatter.format(list[i].giagoc - (list[i].giagoc * list[i].giamgia) / 100);
                            list[i].giamgia = list[i].giamgia + "%";
                            giagoc = fomatter.format(list[i].giagoc);
                        }
                        var el = $(`
                            <div class="product__woo">
                                <div class="product__img">
                                    <img src="static/image/product/big_img/${list[i].hinhanh}" alt="">
                                </div>
                                <div class="product__text pt-2 text-center">
                                    <a href="single-product.jsp?masp=${list[i].masp}">${list[i].tensp}</a>
                                </div>
                                <div class="product__cart">
                                    <i class="fa fa-shopping-cart" onclick="addCart('${list[i].masp}')" aria-hidden="true"></i>
                                </div>
                                <div class="product__price">
                                    <label>${thanhtien}</label>
                                    <span class="giasp mx-2">${giagoc}</span>
                                    <span class="giasp mx-2">${list[i].giamgia}</span>
                                </div>
                            </div>
                        `);
                        $('.grid__product').append(el);
                        dem++;
                        sum = sum + 1;
                    }
                }
            }
            let getGiaSP = document.getElementsByClassName("giasp");
            for (let i = 0; i < getGiaSP.length; i++) {
                if (getGiaSP[i].innerHTML == "") {
                    getGiaSP[i].style.display = "none";
                }
            }
            dem = 0;
        }
        if (n > sum) {
            $('.view__more__shop').empty();
        } else {
            if (sum > 0) {
                var view = $(`
                    <button onclick="viewMore(${n})">xem thêm</button>
                `);
                $('.view__more__shop').append(view);
            } else {
                $('.view__more__shop').text("Xin lỗi ! Không có sản phẩm !");
            }
        }
        if (sum == 0) {
            $('.view__more__shop').text("Xin lỗi ! Không có sản phẩm !");
        }
    }).fail(function (response) {
        alert("Lỗi dữ liệu !");
    });
}

function viewMore(n) {
    n = n + 6;
    loadShopGrid(n);
    console.log(n);
}