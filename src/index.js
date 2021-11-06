import 'lightbox2/dist/css/lightbox.min.css';
import 'aos/dist/aos.css';
import '@/scss/index.scss';

import lightbox from 'lightbox2';
import AOS from 'aos';

// Fixes pagespeed warning for jquery
jQuery.event.special.touchstart = {
  setup: function( _, ns, handle ) {
    this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
  }
};
jQuery.event.special.touchmove = {
  setup: function( _, ns, handle ) {
    this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
  }
};
jQuery.event.special.wheel = {
  setup: function( _, ns, handle ){
    this.addEventListener("wheel", handle, { passive: true });
  }
};
jQuery.event.special.mousewheel = {
  setup: function( _, ns, handle ){
    this.addEventListener("mousewheel", handle, { passive: true });
  }
};
// End

const $stickyNav = $('.sticky-nav');
const $toTop = $('.to-top');

$(window).scrollTop() > 50 ?
  $stickyNav.addClass('scrolled') :
  $stickyNav.removeClass('scrolled');

$(window).on('scroll', function() {
  $(this).scrollTop() > 50 ?
    $stickyNav.addClass('scrolled') :
    $stickyNav.removeClass('scrolled');
  $(this).scrollTop() > 320 ? $toTop.fadeIn() : $toTop.fadeOut();
});

$toTop.on('click', function() {
  $('html, body').animate({
    scrollTop: 0
  }, 1000);
});

$('.main-nav').find('a').on('click', function(e) {
  e.preventDefault();
  let id = $(this).attr('href');
  let dest = $(id).offset().top;
  $('html, body').animate({
    scrollTop: dest - 80
  }, 600, function() {
    if (window.innerWidth <= 700) {
      $('.main-nav__list').slideUp();
    }
  });
});

$('.menu-trigger').on('click', function() {
  $('.main-nav__list').slideToggle(400);
});

$('.header__button').on('click', function() {
  $('html, body').animate({
    scrollTop: $('#services').offset().top - 80
  }, 1000);
});

lightbox.option({
  fadeDuration: 400,
  imageFadeDuration: 400,
  albumLabel: 'Portfolio Images',
  resizeDuration: 500,
  wrapAround: true,
  positionFromTop: 200
});

AOS.init({
  disable: window.innerWidth < 940,
  once: true
});

let elems = $(`
  .services-item, 
  .portfolio-item, 
  .about-item__info, 
  .team-item, 
  .parthners__pair, 
  .form__group
`);

$.each(elems, function() {
  $(this).attr('data-aos-delay', 300);
});
