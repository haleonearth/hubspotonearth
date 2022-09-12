;(function($) {
    $(".owl-carousel").owlCarousel({
        margin: 10,
        nav: true,
        // center: true,
        autoplay: true,
        responsive: {
            0:{
              dotsEach: 5,
                items:1
            },
            600:{
              dotsEach: 5,
                items:3
            },
            1000:{
              dotsEach: 5,
                items:4
            }
        }
    });
// eslint-disable-next-line no-undef
})(jQuery);
