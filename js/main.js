$(document).ready(function () {
    init();
    $(document).on("click", ".js-show-on-map", function (e) {
        e.preventDefault()
        let cityName = $(this).data("city");
        $(".region-section__bg").find(".map-marker").hide();
        $(".region-section__bg").find(".map-marker#" + cityName).fadeIn();
    });
    $(document).on("click", ".js-show-all-regions", function () {
        $("#region-is-open").addClass("open");
        $(this).hide();
    });

});

function init() {
    renderShopSlider();
    initMobileMenu();
    initHeaderSearch();
    $(window).resize(function () {
        renderShopSlider();
    })
}

function initHeaderSearch(){
    let $searchBlock = $(".search");
    $(document).on("click", ".js-open-search", function () {
        $("#mobile-search").toggleClass("open");
    });
    $searchBlock.find("input[type='text']").on("keyup change", function(){
       if($(this).val().length){
           $searchBlock.find(".search__clear-button").removeClass("hide");
       }else{
           $searchBlock.find(".search__clear-button").addClass("hide");
       }
    });
    $searchBlock.find(".search__clear-button").on("click", function (){
        $searchBlock.find("input[type='text']").val("").trigger("change");
    });
}

function initMobileMenu(){
    let $mobileMenu = $(".mobile-menu");
    $mobileMenu.on("click", ".js-close-mobile-menu", function(){
        console.log("close");
    })
    $mobileMenu.on("click", ".mobile-menu__item > a", function(e){
        let $this = $(this)
        let $parent = $this.parent();
        if($parent.hasClass("has-submenu")){
            e.preventDefault();
            let id = $parent.data("id");
            $parent.find("[data-parent-id="+id+"] .mobile-menu__submenu-title").text($this.text());
            $parent.find("[data-parent-id="+id+"]").addClass("open");
        }
    })
    $mobileMenu.on("click", ".js-close-submenu", function(){
        let $this = $(this);
        $this.closest(".mobile-menu__submenu").removeClass("open");
        $this.closest(".mobile-menu__submenu").find(".mobile-menu__submenu-title").empty();
    });
    $(document).on("click",".js-toggle-menu, .js-close-mobile-menu", function(){
        $("#mobile-menu").toggleClass("open");
    })
}
function renderShopSlider() {
    var $wrapper = $('#shops-slider');
    if (window.innerWidth < 768) {
        if (!$wrapper.find(".shops__slide").length) {
            $wrapper.find('.shops-slider__item').each(function (index, item) {
                if (index % 2 == 0) {
                    var current = $(item);
                    var next = $(item).next();
                    $wrapper.append($('<div>').addClass("shops__slide").append(current, next));
                }
            });
            $wrapper.slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false,
                autoplay: true,
                autoplaySpeed: 2000,
                lazyLoad: "progressive",
                responsive: [
                    {
                        breakpoint: 520,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
            $wrapper.css("opacity", 1);
        }
    } else {
        if ($wrapper.find(".shops__slide").length) {
            console.log("destroy");
            $wrapper.slick('unslick');
            $wrapper.find('.shops-slider__item').each(function (index, item) {
                $wrapper.append($(item));
            });
            $wrapper.find(".shops__slide").remove()
        }
    }


}