'use strict';

// DOM
const slider = document.querySelector('.slider');
const sliderImages = document.querySelectorAll('.slider img');
const sliderArrowLeft = document.getElementById('sliderArrowLeft');
const sliderArrowRight = document.getElementById('sliderArrowRight');
const sliderCurrent = document.getElementById('sliderCurrent');
const sliderMax = document.getElementById('sliderMax');

const lineup = document.querySelector('.lineup');
const lineupImages = document.querySelectorAll('.lineup__img');
const lineupGroups = document.querySelectorAll('.lineup__group');
const lineupButtons = document.querySelectorAll('.lineup__group button');
const lineupArrowLeft = document.getElementById('lineupArrowLeft');
const lineupArrowRight = document.getElementById('lineupArrowRight');
const lineupCurrent = document.getElementById('lineupCurrent');
const lineupMax = document.getElementById('lineupMax');

// starting state
let curSlide = 0;
let curGroup = 0;
const maxSlide = sliderImages.length;
const maxGroup = lineupGroups.length;

// set max for trackers
lineupMax.textContent = maxGroup;
sliderMax.textContent = maxSlide;

// grab # of img per group in lineup
const imagesPerGroup = +lineup.dataset.imagesPerGroup;

// detection for killing autoplay
let clicked = false;

//////////////////////////
// GROUP SLIDER
function goToGroup(group) {
  lineupGroups.forEach(g => (g.style.transform = `translateX(${-group * 100}%)`));
}

function nextGroup() {
  curGroup === maxGroup - 1 ? (curGroup = 0) : curGroup++;
  goToGroup(curGroup);
  updateNumber(curGroup);
}

function prevGroup() {
  curGroup === 0 ? (curGroup = maxGroup - 1) : curGroup--;
  goToGroup(curGroup);
  updateNumber(curGroup);
}

function updateNumber(num) {
  lineupCurrent.textContent = num + 1; // slides are 0 indexed
}

function clearLineupImages() {
  lineupButtons.forEach(btn => btn.classList.remove('active'));
}

function updateLineup(event) {
  if ((event.target.nodeName === 'IMG') | (event.target.nodeName === 'BUTTON')) {
    clearLineupImages();
    if (event.target.nodeName === 'IMG') {
      event.target.parentNode.classList.add('active');
      curSlide = event.target.dataset.index;
      goToSlide(curSlide);
    } else if (event.target.nodeName === 'BUTTON' && event.target.classList.contains('lineup__button')) {
      // keyboard users
      event.target.classList.add('active');
      curSlide = event.target.querySelector('img').dataset.index;
      goToSlide(curSlide);
    }
  }
}

function tabThroughGroups(event) {
  if (
    event.target.querySelector('img').dataset.index > 0 &&
    event.target.querySelector('img').dataset.index % (imagesPerGroup - 1) === 0
  ) {
    nextGroup();
  }
}

//////////////////////////
// MAIN SLIDER
function goToSlide(slide) {
  sliderImages.forEach(img => (img.style.transform = `translateX(${-slide * 100}%)`));
}

function updateTracker(slide) {
  sliderCurrent.textContent = slide;
}

function nextSlide() {
  curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
  updateTracker(curSlide + 1);
}

function prevSlide() {
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
  goToSlide(curSlide);
  updateTracker(curSlide + 1);
}

// initialize
function sliderInit() {
  goToSlide(curSlide);
  goToGroup(curGroup);
}
sliderInit();

// autoplay
let counter;
let autoplay = slider.dataset.autoplay.toLowerCase() === 'true';
let autoplaySpeed = +slider.dataset.autoplaySpeed;
function sliderAutoplay() {
  counter = setInterval(() => {
    if (clicked === false) {
      nextSlide();
      clearLineupImages();
      lineupImages[curSlide].parentNode.classList.add('active');
      if (curSlide === 0 || curSlide % imagesPerGroup === 0) {
        nextGroup(curGroup);
      }
    } else {
      clearInterval(counter);
    }
  }, autoplaySpeed);
}
if (autoplay) {
  sliderAutoplay();
}

// swiping functionality on touchscreen
let touchstartX = 0;
let touchendX = 0;
let track = slider;

function handleGesture() {
  if (touchendX < touchstartX && touchstartX - touchendX > 40) {
    nextSlide(curSlide);
    clearInterval(counter);
  }
  if (touchendX > touchstartX && touchendX - touchstartX > 40) {
    prevSlide(curSlide);
    clearInterval(counter);
  }
}

track.addEventListener(
  'touchstart',
  e => {
    touchstartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

track.addEventListener(
  'touchend',
  e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
  },
  { passive: true }
);

//////////////////////////
// EVENT HANDLERS
lineup.addEventListener('click', function (e) {
  updateLineup(e);
  clicked = true;
});
lineupArrowLeft.addEventListener('click', function () {
  prevGroup(curGroup);
  clicked = true;
});
lineupArrowRight.addEventListener('click', function () {
  nextGroup(curGroup);
  clicked = true;
});
sliderArrowLeft.addEventListener('click', function () {
  prevSlide(curSlide);
  clicked = true;
});
sliderArrowRight.addEventListener('click', function () {
  nextSlide(curSlide);
  clicked = true;
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Tab' && e.target.classList.contains('lineup__button')) tabThroughGroups(e);
});
