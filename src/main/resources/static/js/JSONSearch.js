/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function fnSearch(){
    $('.list__result ul').empty();
    var keyword = document.querySelector('.search form input[type="text"]').value;
    keyword = keyword.toLowerCase();
    var arr = [];
    var result = [];
    $.ajax({
        url: "ProductServ",
        method: "GET"
    }).done(function (response){
        $.each(response, function (index, item){
           arr.push(item); 
        });
        for(let i of arr){
            if(i.tensp.toLowerCase().includes(keyword)){
                result.push(i);
            }
        }
        if(keyword == "" || result.length == 0){
            var el = $(`<label>Không tìm thấy sản phẩm !</label>`);
            $('.list__result ul').append(el);
            $('.list__result').removeAttr('style');
        }else{
            for(var i = 0; i < result.length; i++){
                var el = $(`<li><a href="single-product.jsp?masp=${result[i].masp}">${result[i].tensp}</a></li>`);
                $('.result__search').css({
                    'opacity' : '1',
                    'visibility' : 'visible'
                });
                $('.list__result ul').append(el);
                var x = $('.list__result').height();
                if (x > 200) {
                    $('.list__result').css({
                        'height': '14em',
                        'overflow-y': 'scroll'
                    });
                } else {
                    $('.list__result').removeAttr('style');
                }
            }
        }
    });
}
function btnSearch(obj){
    location.href = "http://localhost:8080/BookShop/search.jsp?keywork="+obj;
}