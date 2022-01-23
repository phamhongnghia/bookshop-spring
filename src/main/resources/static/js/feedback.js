/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function (){
    loadFeedback();
});

function loadFeedback(){
    $('.single__title span').empty();
    $('.feedback__input').empty();
    $('.list__feedback').empty();
    if (!(document.querySelector('.my__account'))) {
        let error = $(`
            <a href="register.jsp">Mời bạn đăng nhập để gửi ý kiến</a>
        `);
        $('.feedback__input').append(error);
    }else{
        var  tendangnhap = document.querySelector('.my__account').getAttribute('data-user');
        var hoten = document.querySelector('.my__account').getAttribute('data-fullname');
        var  hinhanh = document.querySelector('.my__account').getAttribute('data-img');
        let $account = $(`
            <div class="input__img">
                <img src="static/image/user/${hinhanh}" alt="">
            </div>
            <div class="form__feedback px-3">
                <textarea name="feedback" placeholder="Viết ý kiến ..."></textarea>
                <input type="button" onclick="addFeedback('${tendangnhap}','${hoten}', '${hinhanh}')" value="Gửi">
            </div>
        `);
        $('.feedback__input').append($account);
    }
    
    $.ajax({
        url: "ListFeedback?masp="+url[1],
        method: "GET"
    }).done(function (response) {
        var feedback = new Array();
        $.each(response, function (index, item){
           feedback.push(item); 
        });
        
        if(feedback.length == 0){
            $('.single__title span').text('0 ý kiến');
            let _not = $(`
                <span>Không có ý kiến nào !</span>
            `);
            $('.list__feedback').append(_not);
        }else{
            $('.single__title span').text(feedback.length+' ý kiến');
            for(let i = 0 ; i < feedback.length; i++){
                let el = $(`
                     <div class="feedback__block py-4">
                        <div class="feedback__img px-4">
                            <img src="static/image/user/${feedback[i].hinhanh}" alt="">
                        </div>
                        <div class="feedback__content">
                            <div class="feedback__user">
                                <label class="m-0">${feedback[i].hoten}</label>
                            </div>
                            <div class="feedback__opinion py-2">
                                <p class="m-0">${feedback[i].noidung}</p>
                            </div>
                            <div class="feedback__day">
                                <span>${feedback[i].ngaydang}</span>
                            </div>
                        </div>
                    </div>
                `);
                $('.list__feedback').append(el);
            }
        }
    })
    
    
}

function addFeedback(tendangnhap, hoten, hinhanh){
    var content = document.querySelector('.form__feedback textarea').value;
    if(content == null || content == ""){
        alert("Mời bạn nhập ý kiến !");
    }else{
        const post = {};
        post.tendangnhap = tendangnhap;
        post.masp = url[1];
        post.hoten = hoten;
        post.hinhanh = hinhanh;
        post.noidung = content;

        $.ajax({
            url: "PostFeedback",
            method: "POST",
            data: JSON.stringify(post),
        }).done(function (response) {
            loadFeedback();
        });
    }
}

