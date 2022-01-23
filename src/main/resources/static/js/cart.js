$(document).ready(function (){
   loadCart(); 
});
function addCart(obj){
    var bool = false;
    if(!(document.querySelector('.my__account'))){
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
    }else{
        var tendangnhap = document.querySelector('.my__account').getAttribute('data-user');
        var arr = [];
        $.ajax({
            url: "CartAccount?user="+ tendangnhap,
            method: "GET"
        }).done(function (response) {
            $.each(response, function (index, item){
               arr.push(item);
            });
            if(arr.length == 0){
                $.ajax({
                    url: "SingleServ?masp=" + obj,
                    method: "GET"
                }).done(function (response) {
                    var sanpham = {};
                    sanpham.tendangnhap = tendangnhap;
                    sanpham.masp = obj;
                    sanpham.tensp = response.tensp;
                    sanpham.hinhanh = response.hinhanh;
                    sanpham.giagoc = response.giagoc;
                    sanpham.giamgia = response.giamgia;
                    sanpham.soluong = 1;
                    sanpham.thanhtien = (response.giagoc - (response.giagoc * response.giamgia) / 100);
                    $.ajax({
                        url: "CartServ",
                        method: "POST",
                        data: JSON.stringify(sanpham)
                    }).done(function (resPost) {
                        var mes = "Đã thêm thành công vào giỏ hàng !";
                        messageCart(mes);
                        $('.message').fadeIn('slow/400/fast', function () {
                            $(this).css({
                                'opacity': '1',
                                'visibility': 'visible'
                            });
                            $(this).find('.message__img').css('color', 'var(--green)');
                        }).delay(2000).fadeOut('slow/400/fast', function () {
                            $(this).remove();
                        });
                        loadCart();
                    });
                });
            }else{
                for(var i = 0 ; i < arr.length ; i++){
                    if(obj == arr[i].masp){
                        var updateQty = {};
                        updateQty.id = arr[i].id;
                        updateQty.soluong = arr[i].soluong + 1;
                        console.log(updateQty.soluong);
                        $.ajax({
                            url: "UpdateQtyCartServ",
                            method: "POST",
                            data: JSON.stringify(updateQty)
                        }).done(function (response) {
                            var mes = "Đã thêm thành công vào giỏ hàng !";
                            messageCart(mes);
                            $('.message').fadeIn('slow/400/fast', function () {
                                $(this).css({
                                    'opacity': '1',
                                    'visibility': 'visible'
                                });
                                $(this).find('.message__img').css('color', 'var(--green)');
                            }).delay(2000).fadeOut('slow/400/fast', function () {
                                $(this).remove();
                            });
                            loadCart();
                        });
                        bool = true;
                        break;
                    }else{
                        bool = false;
                    }
                }
                
                if(bool == true){
                    loadCart();
                }else{
                    $.ajax({
                            url: "SingleServ?masp=" + obj,
                        method: "GET"
                    }).done(function (response) {
                        var sanpham = {};
                        sanpham.tendangnhap = tendangnhap;
                        sanpham.masp = obj;
                        sanpham.tensp = response.tensp;
                        sanpham.hinhanh = response.hinhanh;
                        sanpham.giagoc = response.giagoc;
                        sanpham.giamgia = response.giamgia;
                        sanpham.soluong = 1;
                        sanpham.thanhtien = (response.giagoc - (response.giagoc * response.giamgia) / 100);
                        $.ajax({
                            url: "CartServ",
                            method: "POST",
                            data: JSON.stringify(sanpham)
                        }).done(function (resPost) {
                            var mes = "Đã thêm thành công vào giỏ hàng !";
                            messageCart(mes);
                            $('.message').fadeIn('slow/400/fast', function () {
                                $(this).css({
                                    'opacity': '1',
                                    'visibility': 'visible'
                                });
                                $(this).find('.message__img').css('color', 'var(--green)');
                            }).delay(2000).fadeOut('slow/400/fast', function () {
                                $(this).remove();
                            });
                            loadCart();
                        });
                    });
                }
            }
        }).fail(function (response){
            alert("Lỗi load dữ liệu !"); 
        });
    }
    loadCart();
}

// Load giỏ hàng.

function loadCart() {
    $('.list__cart').empty();
    $('.list__cart').removeAttr('style');
    $('.cart__sum').empty();
    if(!(document.querySelector('.my__account'))){
        var elsum = $(`
            <label class="py-3 mx-3">Giỏ hàng trống !</label>
        `);
        var footer = $(`
            <label>Tổng : 0 ₫</label>
            <a href="cart.jsp">Xem chi tiết</a>
        `);
        $('.list__cart').append(elsum);
        $('.cart__sum').append(footer);
    }else{
        var tendangnhap = document.querySelector('.my__account').getAttribute('data-user');
        var thanhtien = 0;
        var arr = [];
        var demCart = 0;
        $.ajax({
            url: "CartAccount?user=" + tendangnhap,
            method: "GET"
        }).done(function (response) {
            $.each(response, function (index, item) {
                arr.push(item);
            });
            if(arr.length == 0){
                var elsum = $(`
                    <label class="py-3 mx-3">Giỏ hàng trống !</label>
                `);
                var footer = $(`
                    <label>Tổng : 0 ₫</label>
                    <a href="cart.jsp">Xem chi tiết</a>
                `);
                $('.list__cart').append(elsum);
                $('.cart__sum').append(footer);
            }else{
                var tongtien = 0;
                for (var i = 0; i < arr.length; i++) {
                    demCart = demCart + arr[i].soluong;
                    tongtien = tongtien + arr[i].soluong * arr[i].thanhtien;
                    var gia = fomatter.format(arr[i].thanhtien);
                    var elpro = $(`
                        <div class="py-3 mx-3 cart__product">
                            <div class="colum-5 cart__title">
                                <img src="static/image/product/big_img/${arr[i].hinhanh}" alt="">
                                <label class="m-0">${arr[i].tensp}</label>
                            </div>
                            <div class="colum-5">
                                <span>SL : ${arr[i].soluong}</span>
                                <span>${gia}</span>
                                <span><i class="fa fa-times-circle" onclick="deleteCart('${arr[i].id}', '${tendangnhap}')" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    `);
                    $('.list__cart').append(elpro);
                }
                var footer = $(`
                    <label>Tổng : ${fomatter.format(tongtien)}</label>
                    <a href="cart.jsp">Xem chi tiết</a>
		`);
                $('.cart__sum').append(footer);
                var x = $('.menu_cart').height();
                if (x > 400) {
                    $('.list__cart').css({
                        'height': '290px',
                        'overflow-y': 'scroll'
                    });
                }
                $('.cart__average').text(demCart);
            }
        }).fail(function (response) {
            alert("Lỗi load dữ liệu !");
        });
    }
}

//Xoá sản phẩm khỏi giỏ hàng

function deleteCart(id, tendangnhap) {
    var item = {};
    item.id = id;
    item.tendangnhap = tendangnhap;
    $.ajax({
        url: "DeleteCartAccount",
        method: "POST",
        data: JSON.stringify(item)
    }).done(function (response) {
        var mes = "Đã xóa thành công sản phảm !";
        messageCart(mes);
        $('.message').fadeIn('slow/400/fast', function () {
            $(this).css({
                'opacity': '1',
                'visibility': 'visible'
            });
            $(this).find('.message__img').css('color', 'var(--green)');
        }).delay(2000).fadeOut('slow/400/fast', function () {
            $(this).remove();
        });
        loadCart();
    });
}

// Message

function messageCart(obj) {
    var mes = $(`
        <div class="message">
            <div class="message__img">
                <i class="fa fa-check-circle" aria-hidden="true"></i>
            </div>
            <div class="message__text">
                ${obj}
            </div>
        </div>
    `);
    $('.alert__cart').append(mes);
}