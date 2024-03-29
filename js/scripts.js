(function ($) {
  "use strict";

  var $window = $(window);

  $window.on('load', function () {
    // Preloader
    $('.loader').fadeOut();
    $('.loader-mask').delay(350).fadeOut('slow');
    initOwlCarousel();

    $window.trigger("resize");
  });


  $window.resize(function () {
    stickyNavRemove();
  });


  /* Detect Browser Size
  -------------------------------------------------------*/
  var minWidth;
  if (Modernizr.mq('(min-width: 0px)')) {
    // Browsers that support media queries
    minWidth = function (width) {
      return Modernizr.mq('(min-width: ' + width + 'px)');
    };
  }
  else {
    // Fallback for browsers that does not support media queries
    minWidth = function (width) {
      return $window.width() >= width;
    };
  }

  /* Mobile Detect
  -------------------------------------------------------*/
  if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
    $("html").addClass("mobile");
  }
  else {
    $("html").removeClass("mobile");
  }

  /* IE Detect
  -------------------------------------------------------*/
  if (Function('/*@cc_on return document.documentMode===10@*/')()) { $("html").addClass("ie"); }



  /* Sticky Navigation
  -------------------------------------------------------*/
  $window.scroll(function () {

    scrollToTop();
    var $navHolder = $('.nav__holder');

    if ($window.scrollTop() > 10 & minWidth(992)) {
      $navHolder.addClass('nav__holder--sticky');
    } else {
      $navHolder.removeClass('nav__holder--sticky');
    }

  });


  function stickyNavRemove() {
    var $navHolder = $('.nav__holder');
    if (!minWidth(992)) {
      $navHolder.removeClass('nav--sticky');
    } else {
      $navHolder.addClass('nav--sticky');
    }
  }


  /* Mobile Navigation
  -------------------------------------------------------*/
  $('.nav__dropdown-trigger').on('click', function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    }
    else {
      $(this).addClass("active");
    }
  });

  if ($('html').hasClass('mobile')) {
    $('body').on('click', function () {
      $('.nav__dropdown-menu').addClass('hide-dropdown');
    });

    $('.nav__dropdown').on('click', '> a', function (e) {
      e.preventDefault();
    });

    $('.nav__dropdown').on('click', function (e) {
      e.stopPropagation();
      $('.nav__dropdown-menu').removeClass('hide-dropdown');
    });
  }


  /* Material Inputs
  -------------------------------------------------------*/
  (function () {
    var $optinInput = $('.optin__input');
    $optinInput.on('blur', function () {
      if ($(this).val()) {
        $(this).parent('.optin__form-group').addClass('optin__form-group--active');
      } else {
        $(this).parent('.optin__form-group').removeClass('optin__form-group--active');
      }
    });
  })();

  /* Owl Carousel
  -------------------------------------------------------*/
  function initOwlCarousel() {

    /* Testimonials
    -------------------------------------------------------*/
    $("#owl-testimonials").owlCarousel({
      center: false,
      items: 1,
      loop: true,
      nav: true,
      dots: false,
      margin: 40,
      lazyLoad: true,
      autoplay: true,
      autoplayTimeout: 3000,
      navSpeed: 500,
      navText: ['<img src="img/left-arrow.svg" alt=""/> ', '<img src="img/right-arrow.svg" alt=""/> '],
      responsive: {
        1200: {
          items: 5
        },
        768: {
          items: 3
        },
        540: {
          items: 1
        }
      }
    })
  }


  /* Accordion
  -------------------------------------------------------*/
  var $accordion = $('.accordion');
  function toggleChevron(e) {
    $(e.target)
      .prev('.accordion__heading')
      .find("a")
      .toggleClass('accordion--is-open accordion--is-closed');
  }
  $accordion.on('hide.bs.collapse', toggleChevron);
  $accordion.on('show.bs.collapse', toggleChevron);


  /* Tabs
  -------------------------------------------------------*/
  $('.tabs__trigger').on('click', function (e) {
    var currentAttrValue = $(this).attr('href');
    $('.tabs__content-trigger ' + currentAttrValue).stop().fadeIn(1000).siblings().hide();
    $(this).parent('li').addClass('tabs__item--active').siblings().removeClass('tabs__item--active');
    e.preventDefault();
  });


  /* Sticky Socials
  -------------------------------------------------------*/
  (function () {
    var $stickyCol = $('.sticky-col');
    if ($stickyCol) {
      $stickyCol.stick_in_parent({
        offset_top: 100
      });
    }
  })();


  /* Scroll to Top
  -------------------------------------------------------*/
  function scrollToTop() {
    var scroll = $window.scrollTop();
    var $backToTop = $("#back-to-top");
    if (scroll >= 50) {
      $backToTop.addClass("show");
    } else {
      $backToTop.removeClass("show");
    }
  }
  function showModal(ele) {
    var title = $(ele).attr("title");
    var imagepath = $(ele).attr("imagepath");
    var description = $(ele).attr("description");
    $('#dynamicModalLongTitle').html(title);
    $('img#dynamicModalimg').attr("src", imagepath);
    $('#dynamicModalDescription').html(description);
    $('#dynamic-modal').modal('show');
  }
  var htmltemplate =
    "<div class='col-md-3 col-sm-6 game_GTH'>"
    + "<article class='entry card box-shadow hover-up'>"
    + "<div class='entry__img-holder card__img-holder'>"
    + "<a href='{{path}}'><img class='entry__img' src='{{imagepath}}' alt='{{title}}' /></a>"
    + "<div class='entry__body card__body'>"
    + "<h4 class='entry__title'>"
    + "<a href='{{path}}'>{{title}}</a>"
    + "</h4>"
    + "<span class='badge badge-{{badgeclass}}'>{{badge}}</span>"
    + "<span href='#' class='badge badgemodalclick' title='{{title}}' description='{{description}}' imagepath='{{imagepath}}'>"
    + "<img src='img/info-icon.svg' width='26' height='26' alt='information'/> </span>"
    + "</div>"
    + "</div>"
    + "</article> "
    + "</div>";
  var emptybox = "<div class='col-md-3 col-sm-6 game_GTH'></div>"
  var totalgames = 10;
  var noofpages = 1;
  var currentpage = 1;
  function renderNewGames(pageno, initialload) {

    $.getJSON("./js/gameslist.json", function (games) {
      var size = 10;
      if (games) {
        if (initialload) {
          totalgames = games.length;
          noofpages = parseInt(totalgames / size);
          if ((totalgames % size) > 0) {
            noofpages = noofpages + 1;
          }
          $('ul.newgamespagination').html("");
          if (noofpages > 1) {
            $('ul.newgamespagination').append('<li class="page-item"><span class="page-link prepage" pageno="1">Previous</span></li>');
          }
          for (var igame = 0; igame < noofpages; igame++) {
            var active = igame == 0 ? 'active' : '';
            $('ul.newgamespagination').append('<li class="page-item ' + active + '"><a class="page-link" pageno="' + (igame + 1) + '">' + (igame + 1) + '<span class="sr-only">(current)</span></a></li>')
          }
          if (noofpages > 1) {
            $('ul.newgamespagination').append('<li class="page-item"><a class="page-link nextpage" pageno="1">Next</a></li>')
          }
        }
        var firstrecord = pageno == 1 ? 0 : (pageno - 1) * size + 1;
        currentpage = pageno;
        $('.page-link').each(function () {
          if ((!$(this).hasClass('nextpage') && !$(this).hasClass('prepage'))) {
            $(this).parent().removeClass('active');
            var pagenoattr = $(this).attr("pageno");
            var pagenostr = pageno + "";
            if (pagenoattr == pagenostr) {
              $(this).parent().addClass('active');
            }
          }
        });
        if (pageno > 1 && noofpages > 1) {
          $('.prepage').each(function () { $(this).parent().removeClass('disabled') });
        }
        else if (pageno == 1 && noofpages > 1) {
          $('.prepage').each(function () { $(this).parent().addClass('disabled') });
        }
        if (pageno < noofpages && noofpages > 1) {
          $('.nextpage').each(function () { $(this).parent().removeClass('disabled') });
        }
        else if (pageno == noofpages && noofpages > 1) {
          $('.nextpage').each(function () { $(this).parent().addClass('disabled') });
        }
        $('.newgamescontainer').html("");
        var sliceddata = $.grep(games, function (element, index) {
          return index > firstrecord - 1 && index < firstrecord + size;
        });
        $(sliceddata).each(function (i, game) {
          var gamehtml = htmltemplate;
          gamehtml = gamehtml.replace("{{title}}", game.title);
          gamehtml = gamehtml.replace("{{title}}", game.title);
          gamehtml = gamehtml.replace("{{title}}", game.title);
          gamehtml = gamehtml.replace("{{path}}", game.link);
          gamehtml = gamehtml.replace("{{path}}", game.link);
          gamehtml = gamehtml.replace("{{badge}}", game.badge);
          gamehtml = gamehtml.replace("{{imagepath}}", game.imagepath);
          gamehtml = gamehtml.replace("{{imagepath}}", game.imagepath);
          gamehtml = gamehtml.replace("{{description}}", game.description);
          gamehtml = gamehtml.replace("{{badgeclass}}", game.badge.toLowerCase());
          $('.newgamescontainer').append(gamehtml);
        });
        if (sliceddata.length % 5 != 0) {
          var emptyboxesneeded = 5 - sliceddata.length % 5;
          for (var iemptybox = 0; iemptybox < emptyboxesneeded; iemptybox++) {
            $('.newgamescontainer').append(emptybox);
          }
        }
      }
    }).fail(function () {
      console.log("An error has occurred.");
    });

  }
  $('.newgamescontainer').on('click', '.badgemodalclick', function () {
    showModal(this);
  });
  $('.newgamespagination').on('click', '.page-link', function () {
    var pageno = $(this).attr("pageno");
    if ($(this).hasClass('nextpage')) {
      $(this).parent().removeClass('disabled');
      if (currentpage == noofpages) {
        $(this).parent().addClass('disabled');
      }
      pageno = currentpage + 1;
    }
    if ($(this).hasClass('prepage')) {
      $(this).parent().removeClass('disabled');
      pageno = currentpage - 1;
      if (pageno == 1) {
        $(this).parent().addClass('disabled');
      }
    }
    renderNewGames(pageno, false);
  });


  $('a[href="#top"]').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 1350, "easeInOutQuint");
    return false;
  });
  renderNewGames(1, true);
})(jQuery);