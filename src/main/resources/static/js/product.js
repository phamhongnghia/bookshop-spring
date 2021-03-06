$(document).ready(function() {
	loadData();
});

// Init variable

const fomatter = new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 });
var dem = 0;

// Load data

function loadData(){

	let demCart = 0;
	// Load product discount
	$('.cart__average').text(demCart);

	var list = new Array();
        $.ajax({
            url: "/api/list-product",
            method: "GET"
        }).done(function (response) {
            $.each(response, function (index, item) {
                list.push(item);
            });
            $('.list__sale').empty();
            for (var i = 0; i < list.length; i++) {
                if (dem == 8) {
                    continue;
                } else {
                    if (list[i].discount >= 50) {
                        var el = $(`
                            <div class="product__woo">
                                <div class="product__img">
                                    <img src="/image/product/big_img/${list[i].productImage}" alt="">
                                </div>
                                <div class="product__text pt-2 text-center">
                                    <a href="/single-product/${list[i].productCode}">${list[i].productName}</a>
                                </div>
                                <div class="product__cart">
                                    <i class="fa fa-shopping-cart" onclick="addCart('${list[i].productCode}')" aria-hidden="true"></i>
                                </div>
                                <div class="product__price">
                                    <label>${fomatter.format(list[i].cost - (list[i].cost * list[i].discount) / 100)}</label>
                                    <span class="mx-2">${fomatter.format(list[i].cost)}</span>
                                    <span class="mx-2">${list[i].discount}%</span>
                                </div>
                            </div>
                        `);
                        $('.list__sale').append(el);
                        dem++;
                    }
                }
            }
            $('.list__sale').slick({
                slidesToShow: 4,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToScroll: 1
            });
        }).fail(function (response) {
            alert("L???i load d??? li???u");
        });
        dem = 0;
        var url = window.location.href.split();
        url[1] = "#ALL";
        loadAll(url[1], 8);
        $('.all__product').addClass('fadeShow');

	// Load major producer

	$('.author__major').empty();
	for (let i = 0 ; i < major.length ; i++){
		if(dem == 4){
			continue;
		}else{
			let el = $(`
				<div class="col-sm-3">
					<div class="author__img text-center">
						<img src="image/producer/${major[i].img}" alt="">
					</div>
					<div class="author__text py-2 text-center ">
						<label>${major[i].tacgia}</label>
					</div>
					<div class="author__research text-center">
						<a href="#">xem chi ti???t</a>
					</div>
				</div>
			`);
			$('.author__major').append(el);
			dem++;
		}
	}

}
function loadAll(obj){
	$('.all__product').removeClass('fadeShow');
	$('.all__product').empty();
	
	// Load all product

	if(obj == null || obj == "#ALL"){
		for (let i = 0 ; i < arr.length ; i++){
			if(dem == 8){
				continue;
			}else{
				if(arr[i].giamgia >= 40){
					let el = $(`
						<div class="product__woo">
							<div class="product__img">
								<img src="image/product/big_img/${arr[i].img}" alt="">
							</div>
							<div class="product__text pt-2 text-center">
								<a href="single-product.html?id=${arr[i].id}">${arr[i].tensach}</a>
							</div>
							<div class="product__cart">
								<i class="fa fa-shopping-cart" onclick="addCart(this)" aria-hidden="true"></i>
							</div>
							<div class="product__price">
								<label>${fomatter.format(arr[i].giagoc-(arr[i].giagoc*arr[i].giamgia)/100)}</label>
								<span class="mx-2">${fomatter.format(arr[i].giagoc)}</span>
								<span class="mx-2">${arr[i].giamgia}%</span>
							</div>
						</div>
					`);
					$('.all__product').append(el);
					$('.all__product').addClass('fadeShow');
					dem++;
				}
			}
		}
	}else{
		if(obj == "#STN"){
			for (let i = 0 ; i < arr.length ; i++){
				if(dem == 8){
					continue;
				}else{
					if(arr[i].loaisach == "VH_TN"){
						let el = $(`
							<div class="product__woo">
								<div class="product__img">
									<img src="image/product/big_img/${arr[i].img}" alt="">
								</div>
								<div class="product__text pt-2 text-center">
									<a href="single-product.html?id=${arr[i].id}">${arr[i].tensach}</a>
								</div>
								<div class="product__cart">
									<i class="fa fa-shopping-cart" onclick="addCart(this)" aria-hidden="true"></i>
								</div>
								<div class="product__price">
									<label>${fomatter.format(arr[i].giagoc-(arr[i].giagoc*arr[i].giamgia)/100)}</label>
									<span class="mx-2">${fomatter.format(arr[i].giagoc)}</span>
									<span class="mx-2">${arr[i].giamgia}%</span>
								</div>
							</div>
						`);
						$('.all__product').append(el);
						$('.all__product').addClass('fadeShow');
						dem++;
					}
				}
			}
		}else{
			if(obj == "#SNN"){
				for (let i = 0 ; i < arr.length ; i++){
					if(dem == 8){
						continue;
					}else{
						if(arr[i].loaisach == "QLKD" || arr[i].loaisach == "KH_VT"){
							let el = $(`
								<div class="product__woo">
									<div class="product__img">
										<img src="image/product/big_img/${arr[i].img}" alt="">
									</div>
									<div class="product__text pt-2 text-center">
										<a href="single-product.html?id=${arr[i].id}">${arr[i].tensach}</a>
									</div>
									<div class="product__cart">
										<i class="fa fa-shopping-cart" onclick="addCart(this)" aria-hidden="true"></i>
									</div>
									<div class="product__price">
										<label>${fomatter.format(arr[i].giagoc-(arr[i].giagoc*arr[i].giamgia)/100)}</label>
										<span class="mx-2">${fomatter.format(arr[i].giagoc)}</span>
										<span class="mx-2">${arr[i].giamgia}%</span>
									</div>
								</div>
							`);
							$('.all__product').append(el);
							$('.all__product').addClass('fadeShow');
							dem++;
						}
					}
				}
			}else{
				if(obj == "#OTHER"){
					for (let i = 0 ; i < arr.length ; i++){
						if(dem == 8){
							continue;
						}else{
							if(arr[i].loaisach == "TSHK" || arr[i].loaisach == "TLH" || arr[i].loaisach == "TNHI"){
								let el = $(`
									<div class="product__woo">
										<div class="product__img">
											<img src="image/product/big_img/${arr[i].img}" alt="">
										</div>
										<div class="product__text pt-2 text-center">
											<a href="single-product.html?id=${arr[i].id}">${arr[i].tensach}</a>
										</div>
										<div class="product__cart">
											<i class="fa fa-shopping-cart" onclick="addCart(this)" aria-hidden="true"></i>
										</div>
										<div class="product__price">
											<label>${fomatter.format(arr[i].giagoc-(arr[i].giagoc*arr[i].giamgia)/100)}</label>
											<span class="mx-2">${fomatter.format(arr[i].giagoc)}</span>
											<span class="mx-2">${arr[i].giamgia}%</span>
										</div>
									</div>
								`);
								$('.all__product').append(el);
								$('.all__product').addClass('fadeShow');
								dem++;
							}
						}
					}
				}
			}
		}
	}
}
function btnProduct(obj) {
	let url = $(obj).attr('href');
	dem = 0;
	loadAll(url);
}
function loadCategories() {
	let sum = 0;
	for(let i = 0 ; i < title.length ; i++){
		for(let j = 0 ; j < arr.length ; j ++){
			if(arr[j].loaisach == title[i].loaisach){
				sum = sum + 1;
			}
		}
		let getLink = document.getElementById(title[i].loaisach).href = "shop-grid.html?t="+title[i].loaisach;
		let node = document.getElementById(title[i].loaisach).children;
		node[0].innerHTML = "("+sum+")";
		sum = 0;
	}
}