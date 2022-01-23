/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('tbody tr').find('.thanhtien').each(function () {
        var getPrice = $(this).attr('data-price');
        $(this).text(fomatter.format(getPrice));
    });
    $('.sub__changepass').css('cursor', 'not-allowed');
    loadTab();
    updateImg();

    //Pagination
    var rowsShown = 5;
    var rowsTotal = $('.account__bill tbody tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('.start').append('<li><a href="#!" rel="' + i + '">' + pageNum + '</a></li>');
    }
    $('.account__bill tbody tr').hide();
    $('.account__bill tbody tr').slice(0, rowsShown).show();
    $('.start a:first').addClass('active');
    $('.start a').bind('click', function () {
        $('.start a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('.account__bill tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                css('display', 'table-row').animate({opacity: 1}, 300);
    });
});
function check() {
    var email = document.querySelector('.acc__email').value;
    var ckEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var phonenumber = document.querySelector('.sodienthoai').value;
    var check = /0+([0-9]{9})\b/g;
    if (check.test(phonenumber) == true && ckEmail.test(email)) {
        document.querySelector('.sub__change').disabled = false;
        $('.sub__change').removeAttr('style');
        $('.edit__alert span').text("Hợp lệ !");
        $('.edit__alert span').css('color', 'green');
    } else {
        document.querySelector('.sub__change').disabled = true;
        $('.sub__change').css('cursor', 'not-allowed');
        $('.edit__alert span').text("Email hoặc số điện thoại không hợp lệ !");
        $('.edit__alert span').css('color', 'red');
    }
}
function checkPass() {
    var passOld = document.querySelector('.pass__old').value;
    var passNew = document.querySelector('.pass__new').value;
    var rePass = document.querySelector('.re__pass').value;
    if (passOld == "" || passNew == "" || rePass == "") {
        $('.sub__changepass').css('cursor', 'not-allowed');
        $('.pass__alert span').text("Bạn chưa nhập các trường, mời bạn điền thông tin !");
        $('.pass__alert span').css('color', 'red');
    } else {
        if (passNew == rePass) {
            document.querySelector('.sub__changepass').disabled = false;
            $('.sub__changepass').removeAttr('style');
            $('.pass__alert span').removeAttr('style');
            $('.pass__alert span').text("");
        } else {
            document.querySelector('.sub__changepass').disabled = true;
            $('.sub__changepass').css('cursor', 'not-allowed');
            $('.pass__alert span').text("Mật khẩu không trùng khớp !");
            $('.pass__alert span').css('color', 'red');
        }
    }
}
function tabAcc(obj) {
    $('.account__menu ul li a').removeClass('active');
    $('.tab').removeClass('account__active');
    $(obj).addClass('active');
    var title = $(obj).text();
    var url = $(obj).attr('href');
    $('.account__title label').text(title);
    $('.account__tab ' + url).addClass('account__active');
}
function updateImg() {
    loadImage();
    var url = window.location.href.split("&status=");
    if (url.length > 0 && url[1] != null) {
        if (url[1] == 1) {
            var mes = "Cập nhật thành công !";
            messageCart(mes);
            $('.message').fadeIn('slow/10000', function () {
                $(this).css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
                $(this).find('.message__img').css('color', 'var(--green)');
            }).delay(5000).fadeOut('slow/10000', function () {
                $('.alert__cart').removeAttr('style');
                $(this).remove();
            });
        } else {
            var mes = "Không thể cập nhật !";
            messageCart(mes);
            $('.message').fadeIn('slow/10000', function () {
                $(this).css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
                $(this).find('.message__img').css('color', 'var(--danger)');
            }).delay(5000).fadeOut('slow/10000', function () {
                $('.alert__cart').removeAttr('style');
                $(this).remove();
            });
        }
    }
}
function updateAcc(obj) {
    var hoten = document.querySelector('.acc__hoten').value;
    var email = document.querySelector('.acc__email').value;
    var sodienthoai = document.querySelector('.sodienthoai').value;
    var diachi = document.querySelector('.acc__diachi').value;
    var acc = {};
    acc.hoten = hoten;
    acc.email = email;
    acc.sodienthoai = sodienthoai;
    acc.diachi = diachi;
    $.ajax({
        url: "UpdateAccount?user=" + obj,
        method: "POST",
        data: JSON.stringify(acc)
    }).done(function (response) {
        var mes = "Cập nhật thành công !";
        messageCart(mes);
        $('.message').fadeIn('slow/10000', function () {
            $(this).css({
                'opacity': '1',
                'visibility': 'visible'
            });
            $(this).find('.message__img').css('color', 'var(--green)');
        }).delay(1000).fadeOut('slow/10000', function () {
            location.reload();
            $('.alert__cart').removeAttr('style');
            $(this).remove();
        });
    }).fail(function (response) {
        var mes = "Không thể cập nhật !";
        messageCart(mes);
        $('.message').fadeIn('slow/10000', function () {
            $(this).css({
                'opacity': '1',
                'visibility': 'visible'
            });
            $(this).find('.message__img').css('color', 'red');
        }).delay(5000).fadeOut('slow/10000', function () {
            $('.alert__cart').removeAttr('style');
            $(this).remove();
        });
    });
}

function loadDetailAccount(tendangnhap) {
    $.ajax({

    }).done(function (response) {

    });
    document.querySelector('.my__account').getAttribute('data-user');
    document.querySelector('.my__account').getAttribute('data-fullname');
    document.querySelector('.my__account').getAttribute('data-img');
}
function loadTab() {
    var url = window.location.href.split('/');
    if (url.length > 5 && url[url.length - 1] != null) {
        $('.account__menu ul li a').removeClass('active');
        $('.tab').removeClass('account__active');
        $('.account__menu ul li ' + url[url.length - 1]).addClass('active');
        var title = $('.menu__account ul li ' + url[url.length - 1]).text();
        $('.account__title label').text(title);
        $('.account__tab ' + url[url.length - 1]).addClass('account__active');
    }
}
function loadDetailBill(obj) {
    var mahd = obj;
    $('.append__bill').empty();
    $('.account__details__bill').css('display', 'block');
    $('.title__details__bill label').text("Chi tiết đơn hàng");
    $.ajax({
        url: "SingleBill?mahd=" + mahd,
        method: "GET"
    }).done(function (response) {
        $.ajax({
            url: "SingleServ?masp=" + response.masp,
            method: "GET"
        }).done(function (res) {
            var el = $(`
                <div class="row pt-3">
                    <div class="col-sm-4">
                        <div class="img__bill">
                            <img class="img-fluid" src="static/image/product/big_img/${res.hinhanh}">
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="title__bill">
                            <label>${response.tensp}</label>
                        </div>
                        <div class="right__bill py-2">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="qty__bill">
                                        <label>Số lượng :</label>
                                        <span class="mx-2">${response.soluong}</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="price__bill">
                                    <label>Thành tiền :</label>
                                    <span class="mx-2">${fomatter.format(response.thanhtien)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="details__single__bill border">
                        <div class="title__single__bill p-2 bg-light border-bottom">
                            <label class="m-0">Thông tin đơn hàng</label>
                        </div>
                        <div class="panel__bill p-3">
                            <div>
                                <label>Mã đơn hàng :</label>
                                <span class="mx-2">${response.mahd}</span>
                            </div>
                            <div>
                                <label>Mã sản phẩm :</label>
                                <span>${response.masp}</span>
                            </div>
                            <div>
                                <label>Ngày tạo :</label>
                                <span class="mx-2">${response.ngaytao}</span>
                            </div>
                            <div>
                                <label>SDT đặt hàng :</label>
                                <span class="mx-2">${response.sodienthoai}</span>
                            </div>
                            <div>
                                <label>Tình trạng :</label>
                                <span class="mx-2 text-success">${response.trangthai}</span>
                            </div>
                            <div>
                                <label>Địa chỉ nhận hàng :</label>
                                <span class="mx-2">${response.diachi}</span>
                            </div>
                        </div>
                    </div>
                </div>
           `);
            $('.append__bill').append(el);
            var mes = "Mời bạn cuộn chuột xuống dưới !";
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
        });
    });
}
function loadImage() {
    let tendangnhap = document.querySelector('.my__account').getAttribute('data-user');
    $.ajax({
        url: "GetImage?tendangnhap=" + tendangnhap,
        method: "GET"
    }).done(function (response) {
        document.querySelector('.my__account').setAttribute('data-img', response);
    }).fail(function (response) {
        console.log(response);
    });
}