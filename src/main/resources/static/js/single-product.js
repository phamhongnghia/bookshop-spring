$(document).ready(function () {

    loadSingleProduct();

});

var url = window.location.href.split("?masp=");

function loadSingleProduct() {

    var getLoai;
    $.ajax({
        url: "SingleServ?masp=" + url[1],
        method: "GET"
    }).done(function (response) {

        // Load Title
        $('title').text(response.tensp);

        //Load Breadcrum
        $.ajax({
            url: "ListType",
            method: "GET"
        }).done(function (res) {
            var arr = new Array();
            $.each(res, function (index, item) {
                arr.push(item);
            });
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].maloai == response.maloai) {
                    var ol = $(`
                        <li class="breadcrumb-item"><a href="shop-grid.jsp?t=${arr[i].maloai}">${arr[i].tenloai}</a></li>
                        <li class="breadcrumb-item active"><a href="single-product.jsp?masp=${response.masp}">${response.tensp}</a></li>
                    `);
                    $('.breadcrumb').append(ol);
                    // Load Categories
                    $('.single__categori a').text(arr[i].tenloai);
                    document.querySelector('.single__categori a').href = "shop-grid.jsp?t=" + arr[i].maloai;
                }
            }
        });

        // Load Product View

        // Image Product
        $('.single__img img').attr("src", "static/image/product/big_img/" + response.hinhanh);

        // Title Product
        $('.product__tilte h5').text(response.tensp);

        // Price Product
        var sale = (response.giamgia / 100);
        var price = $(`
            <label>${fomatter.format(response.giagoc - (response.giagoc * sale))}</label>
        `);
        $('.single__price').append(price);
        if (response.giamgia > 0) {
            let sale = $(`
                <span class="price mx-3">${fomatter.format(response.giagoc)}</span>
                <span class="sale mx-3">${response.giamgia}%</span>
            `);
            $('.single__price').append(sale);
        }
        document.querySelector('.single__content p').innerHTML = response.mota;
        document.querySelector('.single__desc').innerHTML = response.noidung;

        var cart = $(`
            <i class="fa fa-shopping-cart" onclick="addCart('${response.masp}')" aria-hidden="true"></i>
        `);
        $('.single__cart').append(cart);
        // Load Product Details
        var tr = $(`
            <tr>
                <td>Mã sản phẩm</td>
                <td>${response.masp}</td>
            </tr>
            <tr>
                <td>Nhà cung cấp</td>
                <td>${response.nhacungcap}</td>
            </tr>
            <tr>
                <td>Nhà xuất bản</td>
                <td>${response.nhaxuatban}</td>
            </tr>
            <tr>
                <td>Tác giả</td>
                <td>${response.tacgia}</td>
            </tr>
            <tr>
                <td>Năm xuất bản</td>
            	<td>${response.namxuatban}</td>
            </tr>
            <tr>
                <td>Hình thức bìa</td>
                <td>${response.hinhthuc}</td>
            </tr>
            <tr>
                <td>Trọng lượng</td>
                <td>${response.trongluong}</td>
            </tr>
            <tr>
               	<td>Số trang</td>
            	<td>${response.sotrang}</td>
            </tr>
            <tr>
                <td>Người dịch</td>
            	<td>${response.nguoidich}</td>
            </tr>
        `);
        $('.single__details tbody').append(tr);
        getLoai = response.maloai;
        loadCategories();

        // Load related product of single product 
        $.ajax({
            url: "ProductServ",
            method: "GET"
        }).done(function (resp) {
            var arr = new Array();
            $.each(resp, function (index, item) {
                arr.push(item);
            });
            dem = 0;
            $('.related__product').empty();
            for (var i = 0; i < arr.length; i++) {
                if (dem == 8) {
                    continue;
                } else {
                    if (arr[i].maloai == response.maloai && arr[i].masp != response.masp) {
                        let thanhtien = 0;
                        let giagoc = 0;
                        if (arr[i].giamgia == 0) {
                            arr[i].giamgia = "";
                            thanhtien = fomatter.format(arr[i].giagoc);
                            giagoc = "";
                        } else {
                            thanhtien = fomatter.format(arr[i].giagoc - (arr[i].giagoc * arr[i].giamgia) / 100);
                            arr[i].giamgia = arr[i].giamgia + "%";
                            giagoc = fomatter.format(arr[i].giagoc);
                        }
                        let el = $(`
                            <div class="product__woo">
                                <div class="product__img">
                                    <img src="static/image/product/big_img/${arr[i].hinhanh}" alt="">
                                </div>
                                <div class="product__text pt-2 text-center">
                                    <a href="single-product.jsp?masp=${arr[i].masp}">${arr[i].tensp}</a>
                                </div>
                                <div class="product__cart">
                                    <i class="fa fa-shopping-cart" onclick="addCart('${arr[i].masp}')" aria-hidden="true"></i>
                                </div>
                                <div class="product__price">
                                    <label>${thanhtien}</label>
                                    <span class="giasp mx-2">${giagoc}</span>
                                    <span class="giasp mx-2">${arr[i].giamgia}</span>
                                </div>
                            </div>  
                        `);
                        $('.related__product').append(el);
                        dem++;
                    }
                }
            }
            let list = document.getElementsByClassName("giasp");
            for (let i = 0; i < list.length; i++) {
                if (list[i].innerHTML == "") {
                    list[i].style.display = "none";
                }
            }
            dem = 0;
            $('.related__product').slick({
                slidesToShow: 3,
                infinite: false
            });
        });

    });

}
function showModal() {
    if (!(document.querySelector('.my__account'))) {
        var el = $(`
            <div class="modal__product">
                <i class="fa fa-times close__modal" onclick="closeModal()" aria-hidden="true"></i>
                <div class="modal__body">
                    <div class="footer__logo pb-3">
                        <h5>Book<span>Shop</span></h5>
                    </div>
                    <div class="text-center single__title product__tilte">
                        <h5>
                            BẠN CHƯA ĐĂNG NHẬP ! MỜI BẠN ĐĂNG NHẬP ĐỂ TIẾP TỤC !
                        </h5>
                    </div>
                    <div class="pt-4 text-center">
                        <a href="register.jsp">Mời bạn đăng nhập !</a>
                    </div>
                </div>
            </div>
        `);
        $('.modal__popup').append(el);
        $('.modal__popup').fadeIn('slow', function () {
            $('.modal__popup').css({
                'opacity': '1',
                'visibility': 'visible',
                'z-index': '99999999'
            });
        });
    } else {
        $.ajax({
            url: "SingleServ?masp=" + url[1],
            method: "GET"
        }).done(function (response) {
            var qty = document.querySelector('.single__qty input').value;
            var tendangnhap = document.querySelector('.my__account').getAttribute('data-user');
            var diachi = document.querySelector('.my__account').getAttribute('data-address');
            var el = $(`
                <div class="modal__product">
                    <i class="fa fa-times close__modal" onclick="closeModal()" aria-hidden="true"></i>
                    <div class="row">
                        <div class="col-sm-6 single__img">
                            <!-- Image product -->
                            <img src="static/image/product/big_img/${response.hinhanh}" alt="">
                        </div>
                        <div class="col-sm-6 modal__body">
                            <div class="single__title product__tilte">
                            <h5>
                                ${response.tensp}
                            </h5>
                            </div>
                                <div class="single__price py-3 border-bottom">
                                <label>${fomatter.format(response.giagoc - (response.giagoc * response.giamgia) / 100)}</label>
                                <span class="mx-2">${fomatter.format(response.giagoc)}</span>
                                <span class="mx-2">${response.giamgia}%</span>
                            </div>
                            <div class="single__qty pt-4">
                                <span class="font-weight-bold">Số lượng : </span>
                                <label class="mb-0 mx-3">${qty}</label>
                            </div>
                            <div class="single__address pt-3">
                                <div class="form-group mb-0">
                                    <label class="m-0">Địa chỉ nhận hàng</label><br>
                                    <span style="font-size: 12px">(Thôn/Ấp - Xã/Phường - Huyện/Quận - Tỉnh/Thành Phố)</span>
                                    <input class="mt-2" type="text"  name="diachi" value="${diachi}">
                                </div>
                            </div>
                            <div class="single__phone pt-3">
                                <div class="form-group mb-0">
                                    <label class="pb-2 m-0">Mời nhập số điện thoại nhận hàng</label>
                                    <input type="tel" id="phone" name="phone" onkeyup="checkPhone(this)">
                                </div>
                            </div>
                            <div class="single__error">
                                <span>Mời bạn nhập số điện thoại để đặt hàng !</span>
                            </div>
                            <div class="single__buy py-4">
                                <button class="btn__order m-0 w-50" disabled onclick="orderSuccess('${tendangnhap}','${response.masp}','${qty}')">Đặt ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            $('.modal__popup').append(el);
            $('.btn__order').css('cursor', 'not-allowed');
            $('.modal__popup').fadeIn('slow', function () {
                $('.modal__popup').css({
                    'opacity': '1',
                    'visibility': 'visible',
                    'z-index': '99999999'
                });
            });
        });
    }
}
function orderSuccess(tendangnhap, masp, qty) {
    var hoten = document.querySelector('.my__account').getAttribute('data-fullname');
    var diachi = document.querySelector('.single__address input').value;
    var sodienthoai = document.querySelector('.single__phone input').value;
    console.log(diachi + "  " + sodienthoai);
    $.ajax({
        url: "SingleServ?masp=" + masp,
        method: "GET"
    }).done(function (response) {
        var price = response.giagoc - (response.giagoc * (response.giamgia / 100));
        var hoadon = {};
        hoadon.tendangnhap = tendangnhap;
        hoadon.masp = masp;
        hoadon.hoten = hoten;
        hoadon.sodienthoai = sodienthoai;
        hoadon.diachi = diachi;
        hoadon.tensp = response.tensp;
        hoadon.giagoc = response.giagoc;
        hoadon.giamgia = response.giamgia;
        hoadon.soluong = qty;
        hoadon.thanhtien = price * qty;
        $.ajax({
            url: "Order",
            method: "POST",
            data: JSON.stringify(hoadon)
        }).done(function (res) {
            $(".modal__popup").fadeOut('slow', function () {
                $(this).removeAttr('style');
                $(this).empty();
            });
            var mes = "Bạn đã đặt hàng thành công ! Mời bạn tiếp tục !";
            messageCart(mes);
            $('.message').fadeIn('slow/10000', function () {
                $(this).css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
                $(this).find('.message__img').css('color', 'var(--green)');
            }).delay(2000).fadeOut('slow/10000', function () {
                $('.alert__cart').removeAttr('style');
                $(this).remove();
            });
        }).fail(function (res) {
        });
    });
}

function checkPhone(obj) {
    var phonenumber = obj.value;
    var check = /0+([0-9]{9})\b/g;
    var form = $(obj).parent();
    var single__phone = form.parent();
    var modal__body = single__phone.parent();
    if (check.test(phonenumber) == true) {
        modal__body.find('.single__buy .btn__order').removeAttr("disabled");
        $('.btn__order').removeAttr('style');
        $('.single__error span').text("Số điện thoại hợp lệ ! Mời bạn đặt hàng !");
        $('.single__error span').css('color', 'green');
    } else {
        modal__body.find('.single__buy .btn__order').attr("disabled", true);
        $('.btn__order').css('cursor', 'not-allowed');
        $('.single__error span').text("Số điện thoại không hợp lệ !");
        $('.single__error span').css('color', 'red');
    }
}