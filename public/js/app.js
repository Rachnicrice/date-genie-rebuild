'use strict';

$('.unhide').on('click', function () {
  console.log(`I'm clicked!`)
  $('nav').toggleClass('hide');
});

$('nav > p > a').on('click', function () {
  $('nav').toggleClass('hide');
});


function authenticateUser () {
  let username = localStorage.getItem('user');
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
  localStorage.setItem('user', user);
});



$(document).ready(function ready() {
  $('#btnin').click(function click() {
    $('#container').append('<span><input type="checkbox" class="chck">' + $('#txtin').val() + '<br /></span>');

    $('input:checkbox').click(function checkBox() {
      let $this = $(this);
      if (this.checked) {
        $this.parent().addClass('completed');
      } else {
        $this.parent().removeClass('completed');
      }
    });
  });
});

$(document).ready(authenticateUser());

