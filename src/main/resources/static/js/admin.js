$(document).ready(function () {
    if(!localStorage.user){
        window.location.replace("http://localhost:8080/login-admin");
    }
    loadAllProduct("ALL");
    loadAllUser();
    loadBill();
    $('.content__title h5').text("Trang chủ");
    $('.admin__list ul li a').click(function () {
        clickAdmin(this);
    });
    var ctx = document.getElementById('myChart').getContext('2d');
    $('.select__maloai').empty();
    $('.select__maloai').append('<option selected value="ALL">Tất cả sản phẩm</option>');
    $.ajax({
        url: "ProductManager",
        method: "GET"
    }).done(function (response) {
        let arr = new Array();
        arr = JSON.parse(response.type);

        var chartArr = new Array();
        for (let i of arr) {
            chartArr.push(i.tenloai);
        }
        $.ajax({
            url: "AmountType",
            method: "GET"
        }).done(function (response) {
            let amount = new Array();
            $.each(response, function (index, item) {
                amount.push(item.soluong);
            });
            
            let getColor = new Array();
            for(let i = 0 ; i < chartArr.length ; i++){
                getColor.push(getRandomColor());
            }
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartArr,
                    datasets: [{
                            label: 'Sản phẩm',
                            data: amount,
                            backgroundColor: getColor,
                            borderColor: getColor,
                            borderWidth: 1
                        }]
                },
                options: {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                    }
                }
            });
        }).fail(function (response) {
            console.log(response);
        });

        // Get type

        for (let i = 0; i < arr.length; i++) {
            let item = $(`<option value="${arr[i].maloai}">${arr[i].tenloai}</option>`);
            $('.select__maloai').append(item);
        }
        document.querySelector(".select__maloai").addEventListener("change", function () {
            loadAllProduct(this.value);
        });
    });
});
const fomatter = new Intl.NumberFormat('vi-VI', {style: 'currency', currency: 'VND', minimumFractionDigits: 0});
function clickAdmin(obj) {
    $('.content__title h5').empty();
    $('.admin__list ul li a').removeClass('admin__active');
    $(obj).addClass('admin__active');
    var url = $(obj).attr('href');
    $('.admin__item').hide();
    $(url).show();
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].code == url) {
            $('.content__title h5').text(tab[i].ten);
        }
    }
    loadAllProduct("ALL");
    loadAllUser();
    loadBill();
}
function loadAllUser() {
    $('.page__account').empty();
    $('.list__user table tbody').empty();
    var arr = new Array();
    $.ajax({
        url: "ListUser",
        method: "GET"
    }).done(function (response) {
        $.each(response, function (index, item) {
            arr.push(item);
        });
        for (var i = 0; i < arr.length; i++) {
            var el = $(`
                <tr>
                    <td>${arr[i].tendangnhap}</td>
                    <td class="w-auto">${arr[i].hoten}</td>
                    <td>${arr[i].email}</td>
                    <td>${arr[i].sodienthoai}</td>
                    <td>${arr[i].diachi}</td>
                    <td>${arr[i].quyentruycap}</td>
                    <td class="text-center"><a class="btn btn__view rounded-0" href="#">Ban</a></td>
                </tr>
            `);
            $('.list__user table tbody').append(el);
        }
        $('.page__account').append('<ul class="start__account"></ul>');
        var rowsShown = 7;
        var rowsTotal = $('.list__user tbody tr').length;
        var numPages = rowsTotal / rowsShown;
        for (i = 0; i < numPages; i++) {
            var pageNum = i + 1;
            $('.start__account').append('<li><a href="#!" rel="' + i + '">' + pageNum + '</a></li>');
        }
        $('.list__user tbody tr').hide();
        $('.list__user tbody tr').slice(0, rowsShown).show();
        $('.start__account a:first').addClass('active');
        $('.start__account a').bind('click', function () {
            $('.start__account a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('.list__user tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                    css('display', 'table-row').animate({opacity: 1}, 300);
        });
    });
}
function loadBill() {
    $('.page__bill_account').empty();
    $('.list__bill table tbody').empty();
    $.ajax({
        url: "ListBill",
        method: "GET"
    }).done(function (response) {
        $.each(response, function (index, item) {
            var el = $(`
                <tr>
                    <td>${item.mahd}</td>
                    <td>${item.tendangnnhap}</td>
                    <td>${item.masp}</td>
                    <td>${item.tensp}</td>
                    <td>${item.soluong}</td>
                    <td>${fomatter.format(item.thanhtien)}</td>
                    <td class="text-center text-success font-weight-bold">${item.trangthai}</td>
                </tr>
           `);
            $('.list__bill table tbody').append(el);
        });
        $('.page__bill_account').append('<ul class="start__bill"></ul>');
        var rowsShown = 7;
        var rowsTotal = $('.list__bill tbody tr').length;
        var numPages = rowsTotal / rowsShown;
        for (i = 0; i < numPages; i++) {
            var pageNum = i + 1;
            $('.start__bill').append('<li><a href="#!" rel="' + i + '">' + pageNum + '</a></li>');
        }
        $('.list__bill tbody tr').hide();
        $('.list__bill tbody tr').slice(0, rowsShown).show();
        $('.start__bill a:first').addClass('active');
        $('.start__bill a').bind('click', function () {
            $('.start__bill a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('.list__bill tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                    css('display', 'table-row').animate({opacity: 1}, 300);
        });
    });
}

function loadAllProduct(obj) {
    $('.page__product').empty();
    $('.list__product table tbody').empty();
    $.ajax({
        url: "ListProduct",
        method: "GET"
    }).done(function (response) {
        let arr = new Array();
        $.each(response, function (index, item) {
            arr.push(item);
        });
        if (obj == "ALL") {
            for (let i = 0; i < arr.length; i++) {
                var el = $(`
                    <tr>
                        <td>${arr[i].masp}</td>
                        <td>${arr[i].tensp}</td>
                        <td>${fomatter.format(arr[i].giagoc)}</td>
                        <td>${arr[i].giamgia}%</td>
                        <td class="text-center"><label id="status">${arr[i].trangthai}</label></td>
                        <td class="text-center"><a class="btn btn__edit rounded-0" href="addproduct.html?masp=${arr[i].masp}">Sửa</a></td>
                        <td class="text-center"><a class="btn btn__delete rounded-0" onclick="openDialog(${arr[i].masp})" href="#!">Xóa</a></td>
                    </tr>`);
                $('.list__product table tbody').append(el);
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].maloai == obj) {
                    var el = $(`
                    <tr>
                        <td>${arr[i].masp}</td>
                        <td>${arr[i].tensp}</td>
                        <td>${fomatter.format(arr[i].giagoc)}</td>
                        <td>${arr[i].giamgia}%</td>
                        <td class="text-center"><label id="status">${arr[i].trangthai}</label></td>
                        <td class="text-center"><a class="btn btn__edit rounded-0" href="addproduct.html?masp=${arr[i].masp}">Sửa</a></td>
                        <td class="text-center"><a class="btn btn__delete rounded-0" onclick="openDialog(${arr[i].masp})" href="#!">Xóa</a></td>
                    </tr>`);
                    $('.list__product table tbody').append(el);
                }
            }
        }
//        $.each(response, function (index, item) {
//            var el = $(`
//                    <tr>
//                        <td>${item.masp}</td>
//                        <td>${item.tensp}</td>
//                        <td>${fomatter.format(item.giagoc)}</td>
//                        <td>${item.giamgia}%</td>
//                        <td class="text-center"><label id="status">${item.trangthai}</label></td>
//                        <td class="text-center"><a class="btn btn__edit rounded-0" href="addproduct.html?masp=${item.masp}">Sửa</a></td>
//                        <td class="text-center"><a class="btn btn__delete rounded-0" onclick="openDialog(${item.masp})" href="#!">Xóa</a></td>
//                    </tr>`);
//            $('.list__product table tbody').append(el);
//        });
        $('.page__product').append('<ul class="start__product"></ul>');
        var rowsShown = 7;
        var rowsTotal = $('.list__product tbody tr').length;
        var numPages = rowsTotal / rowsShown;
        for (i = 0; i < numPages; i++) {
            var pageNum = i + 1;
            $('.start__product').append('<li><a href="#!" rel="' + i + '">' + pageNum + '</a></li>');
        }
        $('.list__product tbody tr').hide();
        $('.list__product tbody tr').slice(0, rowsShown).show();
        $('.start__product a:first').addClass('active');
        $('.start__product a').bind('click', function () {
            $('.start__product a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('.list__product tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                    css('display', 'table-row').animate({opacity: 1}, 300);
        });
    }).fail(function (response) {
        console.log(response);
    })
}

var tab = [
    {
        code: "#home",
        ten: "Trang chủ"
    },
    {
        code: "#mn_product",
        ten: "Quản lý sản phẩm"
    },
    {
        code: "#mn_bill",
        ten: "Quản lý hóa đơn"
    },
    {
        code: "#mn_user",
        ten: "Quản lý khách hàng"
    },
    {
        code: "#change",
        ten: "Thay đổi thông tin"
    }
]

function openDialog(obj) {
    $(".modal__delete").empty();
    var el = $(`
        <div class="modal__dialog">
            <div class="modal__dialog__close" onclick="btnClose()"><i class="fa fa-times" aria-hidden="true"></i></div>
            <div class="modal__dialog__header pt-2">
                <h4>Bạn có muốn xóa sản phẩm này ?</h4>
            </div>
            <div class="modal__dialog__body pt-3">
                <div class="d-flex align-items-center justify-content-center">
                    <button class="btn btn-danger rounded-0 mx-2" onclick="btnClose()">Không</button>
                    <button class="btn btn-success rounded-0 mx-2" onclick="deleteProduct(${obj})">Có</button>
                </div>
            </div>
        </div>
    `);
    $(".modal__delete").append(el);
    $("body").css("overflow", "hidden");
    $(".modal__delete").css({
        "opacity": "1",
        "visibility": "visible",
        "transition": ".5s"
    });
}

function btnClose() {
    $("body").removeAttr("style");
    $(".modal__delete").removeAttr("style");
    $(".modal__delete").empty();
}

function deleteProduct(obj) {
    console.log(obj);
    $.ajax({
        url: "http://localhost:8080/BookShop/DeleteProduct?masp=" + obj,
        method: "POST"
    }).done(function (response) {
        alert(response);
        $("body").removeAttr("style");
        $(".modal__delete").removeAttr("style");
        $(".modal__delete").empty();
        loadAllProduct("ALL");
    }).fail(function (response) {
        console.log(response);
    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}