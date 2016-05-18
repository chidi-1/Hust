/**
 * appName - http://chidi-frontend.esy.es/
 * @version v0.1.0
 * @author bev-olga@yandex.ru
 */
(function() {


}).call(this);

(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);

$(document).ready(function (){
    var timeout_link; // задержка при вводе цифр

    // ИНИЦИАЛИЗАЦИЯ

    // slider range
    if($('.slider-range').length){
        $(".slider-range").each(function () {
            var parent = $(this).closest('.label-slider');
            var min_range = Number($(this).attr('data-min_range'));
            var max_range = Number($(this).attr('data-max_range'));
            var min_current = Number($(this).attr('data-min-current'));
            var max_current = Number($(this).attr('data-max-current'));
            var step = Number($(this).attr('data-step'));
            var arr = [];

            arr.push(min_current);
            arr.push(max_current);
            var slider = $(this).slider({
                range: true,
                min: min_range,
                max: max_range,
                values: arr,
                step: step,
                slide: function (event, ui) {
                    var min_current = Number(ui.values[0]);
                    var max_current = Number(ui.values[1]);
                    parent.find('.range_min').prop('value', min_current);
                    parent.find('.range_max').prop('value', max_current);
                }
            });

            parent.find('.range_min').prop('value', min_current);
            parent.find('.range_max').prop('value', max_current);

            $(document).on('input', '.slider-input', function () {
                var pos = $(this).closest('.label-select').find('.slider-range').attr('data-index');
                if ($(this).data("lastval") != $(this).val()) {
                    if ($(this).val() == '') {
                        $(this).prop('value', 0)
                    }
                    else {
                        var value = $(this).prop('value');
                        value = value.replace(/\s+/g, '');
                        if (value == "NaN") {
                            $(this).prop('value', 0)
                        } else {
                            $(this).prop('value', value);
                        }
                    };
                    $(this).data("lastval", $(this).val());

                    if (timeout_link) {
                        clearTimeout(timeout_link)
                    }

                    var min_value_input = parent.find('.range_min').prop('value');
                    var max_value_input = parent.find('.range_max').prop('value');
                    var arr_new = [];
                    min_value_input = min_value_input.replace(/\s+/g, '');
                    min_value_input = Number(min_value_input);
                    max_value_input = max_value_input.replace(/\s+/g, '');
                    max_value_input = Number(max_value_input);
                    if (min_value_input < max_value_input) {
                        arr_new.push(min_value_input);
                        arr_new.push(max_value_input);
                        timeout_link = setTimeout(function () {
                            slider.slider("values", arr_new);
                        }, 250);
                    }
                };
            });
        });
    }

    // маска для телефона
    if($('.inp-phone').length) {
        $('.inp-phone').mask('+7(999)999-99-99');
    }

    // slick
    if($('.slider_block').length){
        $('.slider_block').slick({
             infinite: true,
             dots: true,
             arrows: true,
             autoplay: true,
             autoplaySpeed: 2000
        });
    };

    // slick
    if($('.new_slider').length){
        $('.new_slider').slick({
           infinite: true,
           slidesToShow: 3,
           slidesToScroll: 1
        });
    }

	if($('.slick-arrow').length) {
        $(".slick-arrow").text(" ");
    }

    if($('.inputs .type_1_select').length) {
        $('.inputs .type_1_select').styler({
            fileBrowse: 'Выбор раздела'
        });
    }

    // стилизация селекта
    if($('.js--select-styled').length){
        $(".js--select-styled").each(function(){
            $(this).styler();
        });
    }

    if($(".tabs__content.active .js--img-zoom").length){
        $(".tabs__content.active .js--img-zoom").imagezoomsl({
            magnifiersize: [500, 465]
        });
    }

    // аккордеон
    if($(".accordeon").length) {
        $('.acc_container').hide();
        $('.acc_trigger:first').addClass('active').next().show();

        //On Click
        $('.acc_trigger').click(function () {
            if ($(this).next().is(':hidden')) {
                $('.acc_trigger').removeClass('active').next().slideUp();
                $(this).toggleClass('active').next().slideDown();
            }
            return false;
        });
    }

    // ДЕЙСТВИЯ

	$(".search form").hover(function () {
		if ($(".search input[type='text']").val() == "") {
			$ ( ".search input[type='text']" ).css (
				{
					"display" : "block" ,
					"width" : "0"
				}
			);
			$ ( ".search input[type='text']" ).clearQueue().stop().animate ( { width : "130px" } );
		}
	}, function () {
		if ($(".search input[type='text']").val() == "") {
			$ ( ".search input[type='text']" ).clearQueue().stop().animate (
				{ width : "0px" } , function () {
					$ ( ".search input[type='text']" ).css ( { "display" : "none" });
				}
			);
		}
	});
	$(".search input[type='text']").on("focusout", function () {
		if ($(".search input[type='text']").val() == "") {
			$ ( ".search input[type='text']" ).clearQueue().stop().animate (
				{ width : "0px" } , function () {
					$ ( ".search input[type='text']" ).css ( { "display" : "none" });
				}
			);
		}
	});

    $('.detailed-search').hover(function () {
        $(this).find('.detailed-search-form').stop().slideDown(300);
    },function(){
        $(this).find('.detailed-search-form').stop().slideUp(300);
    });


	$("header .place").hover(function () {
		$("header  .place .dragger").css("display", "block");
	}, function () {
		if ($("header .place .dragger input").val() == "") {
			$ ( "header .place .dragger" ).css ( "display" , "none" );
		}
	});
	$("header .place").on("focusout", function () {
		if ($("header .place .dragger input").val() == "") {
			$ ( "header .place .dragger" ).css ( "display" , "none" );
		}
	});


    // табы
    $('ul.tabs__caption').on('mouseenter', 'li:not(.active)', function() {
        var block = $(this);
          block.addClass('active').siblings().removeClass('active')
          .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        if(block.closest('.tabs').find('.hover-img').length){
            block.closest('.tabs').find('.hover-img').addClass('hidden-block');
        }
        if($(".tabs__content.active .js--img-zoom").length){
            $(".tabs__content.active .js--img-zoom").imagezoomsl({
                magnifiersize: [500, 465]
            });
        }
      });

	$(".color a").on("click", function (e) {
		e.preventDefault();
		$(".color .active").removeClass("active");
		$(this).addClass("active");
	});


	$("footer .hover_menu").hover(function () {
		$(this).clearQueue()
			.stop().animate({
			                                bottom: "0"
		                                }, 200);

		$(".arrow .arrow-icon").addClass("active");
	}, function () {
		$(this).animate({
			                                 bottom: "-373px"
		                                 }, 200);

		$(".arrow .arrow-icon").removeClass("active");
	});

	$(".language .dragger li").on("click", function () {
		var newText =  $(this).text();
		$(this).text($(".language span").text());
		$(".language span").text(newText);
	});

    // +/-
    $(document).on('click', '.js-counter-button', function(){
        var block = $(this);
        var current_value = $(this).closest('.counter').find('.input-number').prop('value');
        var step = 1;
        if(block.hasClass('js-remove') == true && (current_value == 0  || current_value == undefined)){
            return false
        }else{
            current_value = current_value.replace(/\s+/g, '');
            current_value = Number(current_value);
            (block.hasClass('js-remove') == true) ? (current_value = current_value - step) : (current_value = current_value + step);

            block.closest('.counter').find('.input-number').prop('value', current_value);
        }
        if(block.closest('.counter').find('.input-number').prop('value') == 0){
            block.closest('.counter').find('.input-number').prop('value', 1)
        }
        if(block.closest('form').hasClass('item__info-form')){
            if (timeout_link) {
                clearTimeout(timeout_link)
            }
            timeout_link = setTimeout(function () {
                count_item(block);
            }, 250)

        }
        return false;
    });

    // ввод только цифр в поле количетво
    $(document).on('keydown', '.input-number', function(e){input_number();});

    // ввод количества с клавиатуры
    $(document).on('input','.input-number', function(){

        if($(this).data("lastval")!= $(this).val()) {
            if($(this).val() == '' || $(this).val() == "0"  || $(this).val() == 0){
                $(this).prop('value',1)
            }
            else{
                var value = $(this).prop('value');
                if(value[value.length - 1] =='.' && value.length == 1){
                    $(this).prop('value','0.')
                }
                else{
                    if(value[value.length - 1] !='.'){
                        value = value.replace(/\s+/g, '');
                        value = Number(value);
                        value = value.toString();
                        value = number_format(value);
                        if(value == "NaN"){
                            $(this).prop('value',1)
                        }else{
                            $(this).prop('value',value);
                        }
                    }
                    else{
                        if(value[value.length - 1] =='.' && value[value.length - 2] =='.'){
                            value = value.slice(0,-1)
                            $(this).prop('value',value)
                        }
                    }
                }

            };
            $(this).data("lastval", $(this).val());

        };
    });

    // ввод только цифр в поле
    var input_number = function(){
        var allow_meta_keys=[86, 67, 65];
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9  || event.keyCode == 27 || event.keyCode == 110 || event.keyCode == 191 ||
            // Разрешаем: Ctrl+A
            ($.inArray(event.keyCode,allow_meta_keys) > -1 && (event.ctrlKey === true ||  event.metaKey === true)) ||
            // Разрешаем: home, end, влево, вправо
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // Ничего не делаем
            return;
        }
        else {
            // Обеждаемся, что это цифра, и останавливаем событие keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault();
            }
        }
    };

    // формат цифр
    function number_format( str ){
        return str.replace(/(\s)+/g, '').replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
    };


    // изменение в корзине
    var change_basket = function(){
        var form = $('.popup-step.form-article');
        var method = form.attr('method');
        var action = form.attr('action');

        $.ajax({
            type: method,
            url: action,
            data: form.serialize(),
            success: function(data) {
                var parse_data = jQuery.parseJSON(data);
                $('.total-list .value').text(parse_data.total_list);
                $('.total-delivery .value').text(parse_data.total_delivery);
                $('.total-value .value').text(parse_data.total_value);
            }
        });

        return false;
    };

    // посчитать стоимость товаров
    var count_item = function(block){
        var container = block.closest('.counter');
        var price = container.data('price');
        var amount = container.find('.input-number').prop('value');
        block.closest('form').find('.total span').text(price * amount);

        return false;
    };

    // переключение цветов
    $('.item__info-form .label-color label').click(function(){
        var block = $(this);
        if(block.hasClass('has-img')){
            $('.hover-img img').attr('src', block.data('img')).data('large', block.data('img-l')).imagezoomsl({
                magnifiersize: [500, 465]
            });
            $('.hover-img').removeClass('hidden-block');
        }
    });

    // добавить в корзину
    $('.item').on('click', '.js--add-basket', function(){
        var form = $(this).closest('form');
        var method = form.attr('method');
        var action = form.attr('action');

        $.ajax({
            type: method,
            url: action,
            data: form.serialize(),
            success: function(data) {
                var parse_data = jQuery.parseJSON(data);
                $('.basket .number').text(parse_data.basket_total);
                form.find('.counter .input-number').prop('value', 1);
                form.find('.total span').text(form.find('.counter').data('price'));
                alert('Товар добавлен в корзину')
            }
        });

        return false;
    });

    // добавить/удалить из избранного
    $('.item').on('click', '.js--add-favourite', function(){
        var block = $(this),
            method = block.data('method'),
            action = block.data('action'),
            id = block.data('id');

        $.ajax({
            type: method,
            url: action,
            data: {id: id},
            success: function(data) {
                block.toggleClass('added');
                if(block.hasClass('added')){
                    block.find('span').text(block.data('text-remove'))
                }else{
                    block.find('span').text(block.data('text-add'))
                }
            }
        });

        return false;
    });

    // добавить отзыв
    $('.js-feedback-open').click(function(){
        $(this).toggleClass('open').next('.feedback-hidden').slideToggle('300');
        return false;
    });

    // отправка формы
    // валидация формы
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // фокус поля
    $(document).on('focus', '.inp', function(){
        $(this).removeClass('error');
    });

    $(document).on('click', '.js-form-submit', function () {
        if(!($(this).hasClass('disabled'))){
            var form =  $(this).parents('.main-form');
            var errors = false;

            $(form).find('.required').each(function(){
                var val=$(this).prop('value');
                if(val==''){
                    $(this).addClass('error');
                    errors=true;
                }
                else{
                    if($(this).hasClass('inp-mail')){
                        if(validateEmail(val) == false){
                            $(this).addClass('error');
                            errors=true;
                        }
                    }
                }
            });

            if(errors == false){
                var button_value = $(form).find('.js-form-submit').html();
                $(form).find('.js-form-submit').text('Подождите...');

                var method = form.attr('method');
                var action = form.attr('action');
                var data = form.serialize();
                $.ajax({
                    type: method,
                    url: action,
                    data: data,
                    success: function(data) {
                        $(form).find('.js-form-submit').text('Отправить');
                        form.find('.inp').each(function(){
                            $(this).prop('value','')
                        });
                        $('.js-feedback-open').trigger('click');
                        alert('Вызов попапа с уведомлением, что отзыв отправлен');
                    },
                    error: function(data) {
                        $(form).find('.js-form-submit').text('Ошибка');
                        setTimeout(function() {
                            $(form).find('.js-form-submit').html(button_value);
                        }, 2000);
                    }
                });
            }
        }
        return false;
    });

    // map
    if ($('#map').length) {
        var myMap;
        function init() {
            myMap = new ymaps.Map('map', {
                center: [55.731389,37.665886],
                zoom: 15,
                controls: ['zoomControl', 'searchControl']
            });
            myMap.controls.add('zoomControl', { left: 5, top: 5 });

            myMap.behaviors.disable('scrollZoom');
            myMap.geoObjects.add(new ymaps.Placemark([55.731389,37.665886], {}, {
                iconLayout: 'default#image',
                iconImageHref: $('#map').data('img'),
                iconImageSize: [134, 198],
                iconImageOffset: [-67, -198]
            }))
        }
        ymaps.ready(init);
    }
});