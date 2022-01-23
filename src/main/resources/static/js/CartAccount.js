/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function (){
    loadDataCart();
});
function loadDataCart(){
    $('.header__bar ul li .fa-shopping-cart').css('pointer-events', 'none');
    var tendangnhap = document.querySelector('.my__account').getAttribute('data-user');
    var sum = 0;
    var arr = [];
    var dem = 0;
    $.ajax({
        url: "CartAccount?user=" + tendangnhap,
        method: "GET"
    }).done(function (response) {
        $.each(response, function (index, item) {
            arr.push(item);
        });
        if (arr.length == 0) {
            $('.grid__cart').empty();
            $('.total').empty();
            var el = $(`<label class="text-center mx-auto">Giỏ hàng trống !</label>`);
            $('.grid__cart').append(el);
            $('.cart__average').text(0);
            $('.title__custom span').text('( 0 sản phẩm )');
        } else {
            $('.grid__cart table tbody').empty();
            for (var i = 0; i < arr.length; i++) {
                dem = dem + arr[i].soluong;
                var el = $(`
                    <tr>
                        <td class="item__img"><img src="static/image/product/big_img/${arr[i].hinhanh}" alt=""></td>
                        <td class="item__title">
                            <a href="single-product.jsp?masp=${arr[i].masp}">${arr[i].tensp}</a>
                        </td>
                        <td class="item__price">${fomatter.format(arr[i].giagoc)}</td>
                        <td class="item__sale">${arr[i].giamgia}%</td>
                        <td class="item__tt">${fomatter.format(arr[i].giagoc - (arr[i].giagoc * arr[i].giamgia)/100)}</td>
                        <td class="item__qty">${arr[i].soluong}</td>
                        <td class="item__sum">${fomatter.format(arr[i].thanhtien * arr[i].soluong)}</td>
                        <td class="item__sum"><i class="fa fa-times" aria-hidden="true" onclick="deleteCartDetails('${arr[i].id}', '${tendangnhap}')"></i></td>
                    </tr>
                `);
                $('.grid__cart table tbody').append(el);
                sum = sum + (arr[i].thanhtien * arr[i].soluong);
            }
            $('.total__cart span').text(fomatter.format(sum));
            $('.title__custom span').text('( '+dem+' sản phẩm )');
        }
    });
}
function deleteCartDetails(id, tendangnhap) {
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
        loadDataCart();
    });
}
function showInfor(){
    var tendangnhap = document.querySelector('.my__account').getAttribute('data-user');
    var diachi = document.querySelector('.my__account').getAttribute('data-address');
    var el = $(`
            <div class="modal__product__order">
                <i class="fa fa-times close__modal" onclick="closeModal()" aria-hidden="true"></i>
                <div>
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
                            <input type="tel" id="phone" name="phone" onkeyup="checkPhone()">
                        </div>
                    </div>
                    <div class="single__error">
                        <span>Mời bạn nhập số điện thoại để đặt hàng !</span>
                    </div>
                    <div class="single__buy pt-4">
                        <button class="btn__order m-0" disabled onclick="orderCart('${tendangnhap}')">Đặt ngay</button>
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
}
function orderCart(tendangnhap){
    var arr = [];
    var dem = 0;
    var hoten = document.querySelector('.my__account').getAttribute('data-fullname');
    var diachi = document.querySelector('.single__address input').value;
    var sodienthoai = document.querySelector('.single__phone input').value;
    $.ajax({
        url: "CartAccount?user=" + tendangnhap,
        method: "GET"
    }).done(function (response){
//       $.each(response, function (index, item){
//            arr.push(item);
//       });
//       let sls = [];
//       for(let i of response) {
//           sls.push(i.soluong);
//       }
//       
//       console.log(response)
       
       let arr = response;
       arr.reverse();
       for(var i = 0; i < response.length; i++){
            $.ajax({
                url: "SingleServ?masp="+response[i].masp,
                method: "GET"
            }).done(function (res){
                i--;
                var hoadon = {};
                var price = res.giagoc - (res.giagoc * (res.giamgia/100));
                hoadon.tendangnhap = tendangnhap;
                hoadon.masp = res.masp;
                hoadon.hoten = hoten;
                hoadon.sodienthoai = sodienthoai;
                hoadon.diachi = diachi;
                hoadon.tensp = res.tensp;
                hoadon.giagoc = res.giagoc;
                hoadon.giamgia = res.giamgia;
                hoadon.soluong = arr[i].soluong;
                hoadon.thanhtien = price*arr[i].soluong;
                $.ajax({
                    url: "Order",
                    method: "POST",
                    data: JSON.stringify(hoadon)
                }).done(function (res1) {
                    $('.title__custom span').text('( 0 sản phẩm )');
                    $.ajax({
                        url: "DeleteCart?user=" + tendangnhap,
                        method: "POST"
                    }).done(function (res) {
                        loadDataCart();
                        loadCart();
                    });
                }).fail(function (res){
                });
            });
       }
        $(".modal__popup").fadeOut('slow', function () {
            $(this).removeAttr('style');
            $(this).empty();
        });
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
}


function checkPhone(){
    var phonenumber = document.querySelector('.single__phone input').value;
    var check = /0+([0-9]{9})\b/g;
    if(check.test(phonenumber) == true){
        document.querySelector('.btn__order').disabled = false;
        $('.btn__order').removeAttr('style');
        $('.single__error span').text("Số điện thoại hợp lệ ! Mời bạn đặt hàng !");
        $('.single__error span').css('color', 'green');
    }else{
        document.querySelector('.btn__order').disabled = true;
        $('.btn__order').css('cursor', 'not-allowed');
        $('.single__error span').text("Số điện thoại không hợp lệ !");
        $('.single__error span').css('color', 'red');
    }
}
