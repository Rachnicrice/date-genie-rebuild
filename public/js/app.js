'use strict';

$('.unhide').on('click', function () {
  $('nav').toggleClass('hide');
});

$('nav > p > a').on('click', function () {
  $('nav').toggleClass('hide');
})

function authenticateUser () {
  let username = localStorage.getItem('user');
  console.log(username)
  if (username) {
    let location = window.location.pathname;
    if (location === '/') {
      $('.login > input').val(username)
      $('#login').trigger('click');
    }
  } else {
    $('.login').fadeIn();
  }
}

$('#login').on('click', function () {
  let user = $('.login > input').val();
  localStorage.setItem('user', user)
});

$(document).ready(authenticateUser());


