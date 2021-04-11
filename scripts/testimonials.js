'use strict';

// DOM
const testimonialSlider = document.querySelector('.testimonials');
const testimonials = document.querySelectorAll('.testimonial');
const testimonialArrowLeft = document.getElementById('testimonialArrowLeft');
const testimonialArrowRight = document.getElementById('testimonialArrowRight');

// boolean checker for larger screens
let largeScreen = window.screen.width >= 1400;

// starting state and initialization
let testimonialCurSlide = 0;
let testimonialMaxSlide = testimonials.length;
if (largeScreen) testimonialMaxSlide = testimonials.length / 2; // 2 testimonials per slide

function testimonialGoToSlide(slide) {
  let slidesPerSwipe = 1;
  if (largeScreen) slidesPerSwipe = 2;
  testimonials.forEach(t => (t.style.transform = `translateX(${-slide * (slidesPerSwipe * 100)}%)`));
}

function testimonialNextSlide() {
  testimonialCurSlide === testimonialMaxSlide - 1 ? (testimonialCurSlide = 0) : testimonialCurSlide++;
  testimonialGoToSlide(testimonialCurSlide);
}

function testimonialPrevSlide() {
  testimonialCurSlide === 0 ? (testimonialCurSlide = testimonialMaxSlide - 1) : testimonialCurSlide--;
  testimonialGoToSlide(testimonialCurSlide);
}

function testimonialInit() {
  testimonialGoToSlide(testimonialCurSlide);
}
testimonialInit();

// swiping functionality on touchscreen
let testimonialStartX = 0;
let testimonialEndX = 0;
let testimonialTrack = testimonialSlider;

function testimonialHandleGesture() {
  if (testimonialEndX < testimonialStartX && testimonialStartX - testimonialEndX > 60) {
    testimonialNextSlide(testimonialCurSlide);
  }
  if (testimonialEndX > testimonialStartX && testimonialEndX - testimonialStartX > 60) {
    testimonialPrevSlide(testimonialCurSlide);
  }
}

testimonialTrack.addEventListener(
  'touchstart',
  e => {
    testimonialStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

testimonialTrack.addEventListener(
  'touchend',
  e => {
    testimonialEndX = e.changedTouches[0].screenX;
    testimonialHandleGesture();
  },
  { passive: true }
);

// event handlers
testimonialArrowLeft.addEventListener('click', function () {
  testimonialPrevSlide(testimonialCurSlide);
});
testimonialArrowRight.addEventListener('click', function () {
  testimonialNextSlide(testimonialCurSlide);
});
