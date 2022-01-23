$(document).ready(function () {
    Effect();
    if (!document.querySelector('.my__account')) {
        $('.cart__sum a').css({
            'cursor': 'not-allowed',
            'pointer-events': 'none'
        });
    } else {
        $('.cart__sum a').removeAttr('style');
    }
    document.querySelector(".btn__close__phone").addEventListener("click", function () {
        $(".popup__contact label").css({
            "opacity": "0",
            "visibility": "visible",
            "transition": ".5s"
        });
    });
});
function Effect() {
    window.addEventListener("scroll", function () {
        var header = document.querySelector('.header__sticky');
        var cart = document.querySelector('.cart__average');
        header.classList.toggle("sticky", window.scrollY > 0);
        cart.classList.toggle("cart__active", window.scrollY > 0);
    });
    $('.menu__dropdown').hover(function () {
        $(this).css({
            'opacity': '1',
            'visibility': 'visible',
            'top': '100%'
        })
    }, function () {
        $(this).removeAttr('style');
    });
    $('.menu__product a').click(function () {
        $('.menu__product a').removeClass('active__menu');
        $(this).addClass('active__menu');
    });

    // Button search

    $(".btn__search").click(function () {
        $(".search").fadeIn(function () {
            $(".search").css({
                "display": "block",
                "z-index": "999999"
            });
        });

    });
    $(".close-search").click(function () {
        $(".search").fadeOut(function () {
            $(".search").hide('slow');
        });
        $('body').removeAttr('style');
        $('.result__search').removeAttr('style');
        $('.search input').val("");
    });
}