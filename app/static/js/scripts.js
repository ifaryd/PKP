(function ($) {
    /**
    *equivalent de la fonction site_url() CI
    **/

    $(".fancybox").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        //autoPlay: true,
        //playSpeed: 3000,//vitesse de défilement
        helpers:  {
            title:  null
        }
    });


    //Gestion des lecteurs audios
    $('.play-pause').on('click', function () {
        if ($(this).closest('.sm2-bar-ui').hasClass('playing')) {
            $(this).closest('.sm2-bar-ui').removeClass('playing').addClass('pausing');
        } else {
            $(this).closest('.sm2-bar-ui').removeClass('pausing').addClass('playing');
        }
    });

   

     //Infos Flash
    $('#flash-news').bxSlider({
        auto: true,
        controls: false,
        speed: 2000,
        pause: 10000,
        pager: false,
        autoHover: true

    });
    

    


    //Remonter
    $(function() {
        var $w = $(window),
        $btn = $('.btn-up');
                    //var $submenu = $('.sub-menu');
        $w.scroll(function(){
            if($w.scrollTop() < 500){
                $btn.fadeOut();
            } else{
                $btn.fadeIn();
            }
        });

        $btn.click(function() {
            $('html,body').animate({
                scrollTop: 0
            }, 'slow');
        });
    });

    /**
    *Calendrier d'interventions
    **/

    var current_locale_abbr = $('html').attr('lang');

    var language = 'fr';

    if ($.inArray(current_locale_abbr, ['fr', 'en', 'pt', 'es'])) {
        language = current_locale_abbr;
    }



    $('#calendar-events').zabuto_calendar({
        language : language,
        ajax: {
            url : site_url + 'ajax/interventions', 
        },
        cell_border: true,
        today: true,
        nav_icon: {
            prev: '<i class="fa fa-caret-left"></i>',
            next : '<i class="fa fa-caret-right"></i>'
        },
        legend: [
            {type: 'block', label: __('Aujourd\'hui'), classname: 'bg-orange'},
            {type: 'block', label: __('Intervention du prophète'), classname: 'bg-y-light'}
        ]
    }).tooltip({
        selector: '.active-day-link',
        container: '.page'
    });


    function __(line)
    {
        var languages = {
            es : {
                'Aujourd\'hui' : 'Hoy',
                'Intervention du prophète' : 'Intervención del Profeta'
            },
            en : {
                'Aujourd\'hui' : 'Today',
                'Intervention du prophète' : 'Intervention of the Prophet'
            },
            pt : {
                'Aujourd\'hui' : 'Hoje',
                'Intervention du prophète' : 'Intervenção do Profeta '
            }
        };

        if (languages[language]) {
            return languages[language][line];
        }
        return line;
    }




    if (document.location.href.indexOf('nous-contacter') >= 0) {
        var $xhr = $.getScript(base_url + 'assets/js/parsley.min.js');

        $xhr.done(function () {
            $.getScript(base_url + 'assets/js/parsley-messages-' + language + '.js')
        }).fail(function () {
            //$.getScript(baseUrl('assets/js/parsley-messages-fr.js'));
        });
    }
    

    

    //alert($(document.body).width());


    /**
    *bloc à savoir
    **/


    //Bloc à savoir
    var tab_change = function () {
        var $tabs = $('#tabs').find('li');
        var $active = $tabs.filter('.active');
        var $next = $active.next('li').length ?
                    $active.next('li').find('a') :
                    $tabs.filter(':first-child').find('a');

        $next.tab('show');
    };


    var tab_cycle = setInterval(tab_change, 10000);

    $('#tabs').find('a').on('click', function (e) {

        $(this).tab('show');

        clearInterval(tab_cycle);

        setTimeout(function () {
            tab_cycle = setInterval(tab_change, 20000);
        }, 40000);
    });


    /*$('.tab-pane').hover(function () {
        $(this).stop();
        clearInterval(tab_cycle);
    }, function () {
        $(this).stop();
        setTimeout(function () {
            tab_cycle = setInterval(tab_change, 20000);
        }, 40000);
    });*/


    //Lazy Loading images
    var $lazyImage = $('.lazy');

    if ($lazyImage.length) {

        $lazyImage.lazyload({
            effect: 'fadeIn'
        });
    }


    //Menu principal
    var current_location = document.location.href;

    $('#main-menu').superfish({
        delay:200, 
        animation: {opacity:'show',height:'show'}, 
        animationOut: {opacity: 'hide', height : 'hide'},
        cssArrows: false
    }).find('a').each(function () {
        var $this = $(this);
        var attr_href = $this.attr('href');
        var regex = new RegExp('^' + attr_href);
        var $dropdown_menu = $this.closest('.dropdown');
        var has_dropdown_menu = $dropdown_menu.length;
        var $li_parent = has_dropdown_menu ? 
                        $dropdown_menu.parent('li') 
                        : $this.parent('li');
        
        if (current_location.match(regex)) {
            
            return $li_parent
                    .addClass('current')
                        .siblings()
                            .removeClass('current');
            //console.log(true);
        }

        
    });


    $('.scroll').slimScroll({
        height: '185px', 
        size: 4
    });

    /*$('.results-wrapper').not(':empty').slimScroll({
        
        height: '200px',
        size: 3
    });*/


    //Animation sur le "caption" du livre
    var $cycleContainer = $('.book-slideshow');
    

    $('.book-caption').hover(function () {
        $cycleContainer.cycle('pause');
        $(this).stop().animate({top: '0'}, 500);
    }, function () {
        $cycleContainer.cycle('resume');
        $(this).stop().animate({top: (324/2) +  'px'}, 500);
    });

    
    $('.post-thumb-wrapper').each(function () {
        $(this).height($(this).closest('article').height());
    });
    
    

    //PrettyPhoto
    $(function () {
        if ($.fn.prettyPhoto) {
           

             
            $("a[rel^='prettyPhoto']").prettyPhoto({ 
                animation_speed:'normal',
                theme:'light_square'
                //height: 400
            });

            //console.log($a);

            /*$("a[rel='prettyPhoto[inline]']").prettyPhoto({
                theme: 'dark_square',
                social_tools: '',
                markup: '<div class="pp_pic_holder">                        <div class="ppt"> </div>                        <div class="pp_top">                            <div class="pp_left"></div>                             <div class="pp_middle"></div>                           <div class="pp_right"></div>                        </div>                      <div class="pp_content_container">                          <div class="pp_left">                           <div class="pp_right">                              <div class="pp_content">                                    <div class="pp_loaderIcon"></div>                                   <div class="pp_fade">                                       <a href="#" class="pp_expand" title="Expand the image">Agrandir l\'image</a>                                       <div class="pp_hoverContainer">                                             <a class="pp_next" href="#">suiv</a>                                            <a class="pp_previous" href="#">préc</a>                                        </div>                                      <div id="pp_full_res"></div>                                        <div class="pp_details">                                            <div class="pp_nav">                                                <a href="#" class="pp_arrow_previous">Préc</a>                                              <p class="currentTextHolder">0/0</p>                                                <a href="#" class="pp_arrow_next">Suiv</a>                                          </div>                                          <p class="pp_description"></p>                                          <div class="pp_social">{pp_social}</div>                                            <a class="pp_close" href="#">Fermer</a>                                      </div>                                  </div>                              </div>                          </div>                          </div>                      </div>                      <div class="pp_bottom">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                           <div class="pp_right"></div>                        </div>                  </div>                  <div class="pp_overlay"></div>',
                gallery_markup: '<div class="pp_gallery">                               <a href="#" class="pp_arrow_previous">Préc</a>                              <div>                                   <ul>                                        {gallery}                                   </ul>                               </div>                              <a href="#" class="pp_arrow_next">Next</a>                          </div>',

            });*/

            


        }
       
    });


    //REcherche

    $('#live-search').on('click', 'button', function (e) {
        e.preventDefault();
        var $form = $(e.delegateTarget);
        ajaxResult($form);
    });


    $('.ajax-btn').on('click', function (e) {
        e.preventDefault();
        var $form = $(this).closest('form');
        var ajax_url = $form.data('action');

        $.ajax({
            url : ajax_url,
            type : $form.attr('method'),
            dataType : 'json',
            data : $form.serialize(),
            success : function (data) {
                
            },
            beforeSend : function () {

            }
        });
    });



    function ajaxResult($form) {
        $.ajax({
            url: $form.data('action'),
            type: $form.attr('method'),
            data: $form.serialize(),
            cache: false,
            success : function (data) {
                $('.results-wrapper').html(data);
            },
        });
    }

    
    

})(jQuery);