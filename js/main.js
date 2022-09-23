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
    initShopSlider();
    initMobileMenu();
    initHeaderSearch();
    initProductSlider();
    initPriceSlider();
    initMultipleSelect();
    initCategorySlider();
    initConsultationButton();
    $(window).resize(function () {
        initShopSlider();
        initCategorySlider();
        initProductSlider(true);
    })
}

function initHeaderSearch() {
    let $searchBlock = $(".search");
    $(document).on("click", ".js-open-search", function () {
        $("#mobile-search").toggleClass("open");
    });
    $searchBlock.find("input[type='text']").on("keyup change", function () {
        if ($(this).val().length) {
            $searchBlock.find(".search__clear-button").removeClass("hide");
        } else {
            $searchBlock.find(".search__clear-button").addClass("hide");
        }
    });
    $searchBlock.find(".search__clear-button").on("click", function () {
        $searchBlock.find("input[type='text']").val("").trigger("change");
    });
}

function initMobileMenu() {
    let $mobileMenu = $(".mobile-menu");
    $mobileMenu.on("click", ".js-close-mobile-menu", function () {
        console.log("close");
    })
    $mobileMenu.on("click", ".mobile-menu__item > a", function (e) {
        let $this = $(this)
        let $parent = $this.parent();
        if ($parent.hasClass("has-submenu")) {
            e.preventDefault();
            let id = $parent.data("id");
            $parent.find("[data-parent-id=" + id + "] .mobile-menu__submenu-title").text($this.text());
            $parent.find("[data-parent-id=" + id + "]").addClass("open");
        }
    })
    $mobileMenu.on("click", ".js-close-submenu", function () {
        let $this = $(this);
        $this.closest(".mobile-menu__submenu").removeClass("open");
        $this.closest(".mobile-menu__submenu").find(".mobile-menu__submenu-title").empty();
    });
    $(document).on("click", ".js-toggle-menu, .js-close-mobile-menu", function () {
        $("#mobile-menu").toggleClass("open");
    })
}

/*SHOPS PAGE*/
function initShopSlider() {
    var $wrapper = $('#shops-slider');
    if (window.innerWidth < 768) {
        if (!$wrapper.find(".shops__slide").length) {
            $wrapper.find('.shops-slider__item').each(function (index, item) {
                if (index % 2 == 0) {
                    var current = $(item);
                    var next = current.next().hasClass("cards-category__item") ? current.next() :"";
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
/*CATEGORY SLIDER*/
function initCategorySlider() {
    var $wrapper = $('#category-slider');
    if (window.innerWidth < 768) {
        if (!$wrapper.find(".cards-category__slide").length) {
            $wrapper.find('.cards-category__item').each(function (index, item) {
                if (index % 2 == 0) {
                    var current = $(item);
                    var next = current.next().hasClass("cards-category__item") ? current.next() :"";
                    $wrapper.append($('<div>').addClass("cards-category__slide").append(current, next));
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
                            slidesToShow: 2,
                        }
                    }
                ]
            });
            $wrapper.css("opacity", 1);
        }
    } else {
        if ($wrapper.find(".cards-category__slide").length) {
            $wrapper.slick('unslick');
            $wrapper.find('.cards-category__item').each(function (index, item) {
                $wrapper.append($(item));
            });
            $wrapper.find(".cards-category__slide").remove()
        }
    }


}
/*SHOW PAGE*/
function initProductSlider(isResized = false) {
    let $slider = $(".js-product-slider");
    if (window.innerWidth < 768) {
        if (isResized) $slider.slick('unslick');
        $slider.find('.product-slider__item').each(function (index, item) {
            if(index > 3){
                $(item).addClass("hidden");
            }
        });
        $slider.css("opacity", 1);
    }else {
        $slider.find('.product-slider__item.hidden').removeClass("hidden");
        $slider.slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: false,
            lazyLoad: "progressive",
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1180,
                    settings: {
                        slidesToShow: 4,
                    }
                },
            ]
        });
        $slider.css("opacity", 1);
    }

    $(".js-show-more-products").on("click", function(){
        $slider.find('.product-slider__item.hidden').each(function (index, item) {
            if(index < 4){
                $(item).removeClass("hidden");
            }
        });
    });
}

function initPriceSlider(){
    let $priceRange = $(".js-price-range");
    let $priceSlider = $(document).find(".js-price-slider");
    let min = $('.js-price-slider').data("min");
    let max = $('.js-price-slider').data("max");
    let from = $('.js-price-slider').data("from");
    let to = $('.js-price-slider').data("to");
    $priceSlider.slider({
        range: true,
        min: min,
        max: max,
        values: [ from, to ],
        slide: function( event, ui ) {
            $priceRange.find("input[name='minPrice']").val(ui.values[0]);
            $priceRange.find("input[name='maxPrice']").val(ui.values[1]);
        }
    });
    $priceRange.find("input[name='minPrice']").val($priceSlider.slider( "values", 0 ));
    $priceRange.find("input[name='maxPrice']").val($priceSlider.slider( "values", 1 ));
}

function initMultipleSelect(){
    let $select = $(".js-multiple");
    let selectListHtml = "";
    $select.find("option").each(function(i, item){
        selectListHtml += ''+
            '<li class="select-multiple__item">'+
            '    <div class="select-multiple__item-checkbox checkbox">'+
            '        <input type="checkbox" class="checkbox__input" id="item-'+$(item).prop("value")+'" name="'+$(item).text()+'" value="'+$(item).prop("value")+'">'+
            '        <label for="item-'+$(item).prop("value")+'">'+$(item).text()+'</label>'+
            '    </div>'+
            '</li>';
    });
    $select.after($('<div class="select-multiple"></div>')
            .append('<div class="select-multiple__selection"><input class="select-multiple__selection-search-field" placeholder="Поиск магазина"></div>')
            .append($('<ul class="select-multiple__list"></ul>').append('<div class="select-multiple__items"></div>').html(selectListHtml))

    );
    $select.hide();
    /*live search*/
    $(document).on("keyup", ".select-multiple__selection-search-field", function(){
        let findText = $(this).val().toLowerCase();
        let $list = $(this).closest(".select-multiple").find(".select-multiple__list");
        console.log("search")
        $.each($list.find("li label"), function() {
            if($(this).text().toLowerCase().indexOf(findText) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
}

function initConsultationButton(){
    $(document).on("click", ".js-open-consultation-message", function(){
        console.log("open")
        $(this).closest(".consultation").find(".consultation__card-box").toggleClass("open");
    })
}
