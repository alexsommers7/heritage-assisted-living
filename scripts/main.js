'use strict';

// LOADING ANIMATION
let body = document.querySelector('body');
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    body.classList.remove('loading');
  }, 2000);
});

// FOCUS OUTLINES - ONLY OUTLINE IF USER IS TABBIMG
document.body.addEventListener('mousedown', function () {
  document.body.classList.add('using-mouse');
});

document.body.addEventListener('keydown', function () {
  document.body.classList.remove('using-mouse');
});

// ACCORDION
const accordionTriggers = document.querySelectorAll('.accordion__trigger');

accordionTriggers.forEach(trigger => {
  trigger.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});

console.log('testing branches');
