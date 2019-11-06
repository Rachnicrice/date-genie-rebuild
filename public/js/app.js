'use strict';

$('nav').hide();
$('.login').hide();

$('.unhide').on('click', function () {
  console.log(`I'm clicked!`)
  $('nav').fadeIn();
});

$('nav > p > a').on('click', function () {
  $('nav').fadeOut(10000);
})

function authenticateUser () {
  if (localStorage.getItem('user')) {
    $.get('/user', localStorage.getItem('user'))
  } else {
    $('.login').fadeIn();
  }
}

$('#login').on('click', function () {
  let user = $('.login > input').val();
  localStorage.setItem('user', user)
});

authenticateUser();
