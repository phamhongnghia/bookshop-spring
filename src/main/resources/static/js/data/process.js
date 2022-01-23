$(document).ready(function() {
    if(!localStorage.role){
        loadRoleUser();
    }
    loadDataUser();
});
let session = new Array();
//load user
let user;
if(localStorage.user){
    user = JSON.parse(localStorage.user);
}
//load role
if(localStorage.role){
    role = JSON.parse(localStorage.role);
}

function loadRoleUser(){
     $.ajax({
         url: "/api/get-role",
         method: "GET"
     }).done(function (response) {
        console.log(response);
        localStorage.setItem("role", JSON.stringify(response));
     });
}

function loadDataUser(){
    let listItem = document.getElementsByClassName("exist__user");
    if(!localStorage.user){
        for(let i =0 ; i < listItem.length ; i++){
            if(i == (listItem.length - 2)){
                listItem[i].style.display = "block";
            }else{
                listItem[i].style.display = "none";
            }
        }
    }else{
        listItem[listItem.length - 2].style.display = "none";
        $("#username a").text(""+user.username+"");
        if(!localStorage.session){
            let mes = "Đăng nhập thành công !";
            messageCart(mes);
            $('.message').fadeIn('slow/500/fast', function () {
                $(this).css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
                $(this).find('.message__img').css('color', 'var(--green)');
            }).delay(2000).fadeOut('slow/500/fast', function () {
                $('.alert__cart').removeAttr('style');
                $(this).remove();
            });
            session.visit = 1;
            localStorage.setItem("session", JSON.stringify(session));
        }

    }
}

function loginPage(){
    let nodeParents = document.getElementById("form__login").childNodes;
    let username = nodeParents[1].children[1].value;
    let password = nodeParents[1].children[3].value;
     $.ajax({
         url: "/api/info-user/"+username+"/"+password,
         method: "GET"
     }).done(function (response) {
        console.log(response);
        if(response.message == "FAIL"){
            var mes = "Tên đăng nhập hoặc mật khẩu không chính xác !";
            messageCart(mes);
            $('.message').fadeIn('slow/500/fast', function () {
                $(this).css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
                $(this).find('.message__img').css('color', 'var(--danger)');
            }).delay(2000).fadeOut('slow/500/fast', function () {
                $(this).remove();
            });
        }
        if(response.message == "SUCCESS"){
            localStorage.setItem("user", JSON.stringify(response));
            if(response.roleName == "admin"){
                window.location.replace("http://localhost:8080/admin");
            }else{
                window.location.replace("http://localhost:8080/");
            }
        }
     })
}

function register(){
    let nodeParents = document.getElementById("form_register").children[0];
    console.log(nodeParents.length);
    let obj = {};
    for(let i = 0 ; i < nodeParents.length ; i++){
        if(nodeParents.children[i].name != undefined){
            obj[nodeParents.children[i].name] = nodeParents.children[i].value;
            console.log(nodeParents.children[i]);
        }
    }
    /*$.ajax({
        url: "/api/create-user",
        method: "POST",
        data: JSON.stringify(obj),
    }).done(function (response) {
        console.log(response);
    })*/
    console.log(obj);
}

function logoutPage(){
    localStorage.clear();
    /*let mes = "Bạn đã đăng xuất !";
    messageCart(mes);
    $('.message').fadeIn('slow/500/fast', function () {
        $(this).css({
            'opacity': '1',
            'visibility': 'visible'
        });
        $(this).find('.message__img').css('color', 'var(--green)');
    }).delay(2000).fadeOut('slow/500/fast', function () {
        $(this).remove();
    });*/
    location.reload();
}