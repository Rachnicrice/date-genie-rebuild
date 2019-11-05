'use strict';

$('nav').hide();

$('.unhide').on('click', function () {
  console.log(`I'm clicked!`)
  $('nav').fadeIn();
});

$('nav > p > a').on('click', function () {
  $('nav').fadeOut(10000);
})
