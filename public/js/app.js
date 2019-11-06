'use strict';

$('.login').hide();

$('.unhide').on('click', function () {
  $('nav').toggleClass('hide');
});

$('nav > p > a').on('click', function () {
  $('nav').toggleClass('hide');
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
