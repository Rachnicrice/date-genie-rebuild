'use strict';

$('.login').hide();

$('.unhide').on('click', function () {
  $('nav').toggleClass('hide');
});

$('nav > p > a').on('click', function () {
  $('nav').toggleClass('hide');
});

function authenticateUser() {
  if (localStorage.getItem('user')) {
    $.get('/user', localStorage.getItem('user'));
  } else {
    $('.login').fadeIn();
  }
}

$('#login').on('click', function () {
  let user = $('.login > input').val();
  localStorage.setItem('user', user);
});

authenticateUser();






$(document).ready(function ready() {
  $('#btnin').click(function click() {
    $('#container').append('<span><input type="checkbox" class="chck">' + $('#txtin').val() + '<br /></span>');

    $('input:checkbox').click(function checkBox() {
      var $this = $(this);
      if (this.checked) {
        $this.parent().addClass('completed');
      } else {
        $this.parent().removeClass('completed');
      }
    });
  });
});
