/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global CKEDITOR */

$(document).ready(function () {
    CKEDITOR.replace('noidung');
    CKEDITOR.replace('mota');
    load();
});

function load() {
    $('.title__product').empty();
    let url = window.location.href.split("?");
    $('#loaisp').empty();
    $('#loaisp').append('<option selected>Mời chọn</option>');
    $.ajax({
        url: "http://localhost:8080/BookShop/ProductManager",
        method: "GET"
    }).done(function (response) {
        let arr = new Array();
        arr = JSON.parse(response.type);

        // Get type

        for (let i = 0; i < arr.length; i++) {
            let item = $(`<option value="${arr[i].maloai}">${arr[i].tenloai}</option>`);
            $('#maloai').append(item);
        }
        if (url[1] != "") {
            $('.title__product').text('Sửa sản phẩm');
            document.querySelector(".btn__submit").value = "Chỉnh sửa"
            let masp = url[1].split("masp=");
            $.ajax({
                url: "SingleServ?masp=" + masp[1],
                method: "GET"
            }).done(function (response) {
                document.querySelector('#masp').value = response.masp;
                document.querySelector('#maloai').value = response.maloai;
                document.querySelector('#tensp').value = response.tensp;
                document.querySelector('#giagoc').value = response.giagoc;
                document.querySelector('#giamgia').value = response.giamgia;
                if (response.nhaxuatban) {
                    document.querySelector('#nhacungcap').value = response.nhacungcap;
                    document.querySelector('#nhaxuatban').value = response.nhaxuatban;
                    document.querySelector('#tacgia').value = response.tacgia;
                    document.querySelector('#hinhthuc').value = response.hinhthuc;
                    document.querySelector('#nguoidich').value = response.nguoidich;
                    document.querySelector('#namxuatban').value = response.namxuatban;
                    document.querySelector('#trongluong').value = response.trongluong;
                    document.querySelector('#sotrang').value = response.sotrang;
                    CKEDITOR.instances['mota'].setData(response.mota);
                    CKEDITOR.instances['noidung'].setData(response.noidung);
                }
            }).fail(function (response) {
                console.log(response);
            });
        } else {
            $('.title__product').text('Thêm mới sản phẩm');
            document.querySelector(".btn__submit").value = "Thêm sản phẩm"
            let masp = response.count + 1;
            document.querySelector('#masp').value = masp;
        }
//        let itemLoai = $(`<option selected>${}</option>`)
    }).fail(function (response) {
        console.log(response);
    });
}

function addProduct() {
    let arr = document.getElementsByClassName('form__add');
    let obj = {};
    obj.noidung = CKEDITOR.instances['noidung'].getData();
    for (i = 0; i < arr.length; i++) {
        if (arr[i] != undefined && arr[i].name != "noidung") {
            if (arr[i].name == "hinhanh" && arr[i].value != "") {
                let url = arr[i].value.split("fakepath")[length - 1].slice(1);
                obj[arr[i].name] = url;
            } else {
                obj[arr[i].name] = arr[i].value;
            }
        }
    }
    obj.mota = CKEDITOR.instances['mota'].getData();
    $.ajax({
        url: "http://localhost:8080/BookShop/AddProduct",
        method: "POST",
        data: JSON.stringify(obj)
    }).done(function (response) {
        alert(response);
        window.location.reload();
        load();
        console.log(response);
    }).fail(function (response) {
        console.log(response);
    });
}