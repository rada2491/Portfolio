/* Mobile nav */
$(document).ready(function () {

    $('.js--section-about').waypoint(function (direction) {
        if (direction == "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
            offset: '60px;'
        });


    /* Function for nav icon */
    $('.js--nav-icon').click(function () {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');
        nav.slideToggle(200);

        if (icon.hasClass('fa fa-bars')) {
            icon.removeClass('fa-bars');
            icon.addClass('fa-times');
        } else {
            icon.removeClass('fa-times');
            icon.addClass('fa-bars');
        }
    });
});
