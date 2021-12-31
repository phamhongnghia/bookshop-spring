$(document).ready(function() {
	
	loadSingleProduct();

});

function loadSingleProduct() {

    let getLoai;
    let productCode = ((window.location.href.split("/"))-1);
    $.ajax({
        url: "/single-product/" + productCode,
        method: "GET"
    }).done(function (response) {
        console.log(respone)
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
function showModal(){
	let qty = document.querySelector('.single__qty input').value;
	for(let i = 0 ; i < arr.length ; i++){
		if(arr[i].id == url[1]){
			let el= $(`
				<div class="modal__product">
					<i class="fa fa-times close__modal" onclick="closeModal()" aria-hidden="true"></i>
					<div class="row">
						<div class="col-sm-6 single__img">
							<!-- Image product -->
							<img src="image/product/big_img/${arr[i].img}" alt="">
						</div>
						<div class="col-sm-6 modal__body">
							<div class="single__title product__tilte">
								<h5>
									${arr[i].tensach}
								</h5>
							</div>
							<div class="single__price py-3 border-bottom">
								<label>${fomatter.format(arr[i].giagoc-(arr[i].giagoc*arr[i].giamgia)/100)}</label>
								<span class="mx-2">${fomatter.format(arr[i].giagoc)}</span>
								<span class="mx-2">${arr[i].giamgia}%</span>
							</div>
							<div class="single__qty pt-4">
								<span class="font-weight-bold">Số lượng : </span>
								<label class="mb-0 mx-3">${qty}</label>
							</div>
							<div class="single__buy py-4">
								<button class="m-0 w-50">Mua ngay</button>
							</div>
						</div>
					</div>
				</div>
			`);
			$('.modal__popup').append(el);
		}
	}
	$('.modal__popup').fadeIn('slow', function() {
		$('.modal__popup').css({
			'opacity' : '1',
			'visibility' : 'visible',
			'z-index' : '99999999'
		});
	});
}
function closeModal(){
	$(".modal__popup").fadeOut('slow', function() {
		$(this).removeAttr('style');
		$(this).empty();
	});
}