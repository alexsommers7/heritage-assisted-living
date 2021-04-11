'use strict';

// MOBILE NAV FUNCTIONALITY
const navList = document.querySelector('.nav__list');
const navToggle = document.querySelector('#navi-toggle');

navToggle.addEventListener('click', updateNav);
navList.addEventListener('click', updateNav);

function updateNav() {
  navToggle.classList.toggle('nav-open');
  navToggle.classList.toggle('nav-closed');
  navList.classList.toggle('nav-open');
  navList.classList.toggle('nav-closed');
}

// Sticky navigation: Intersection Observer API
const navBar = document.querySelector('header');

const stickyNav = function (entries, observer) {
  entries.forEach(entry => {
    entry.boundingClientRect.top < 0 ? navBar.classList.add('stick') : navBar.classList.remove('stick');
  });
};

const stickyNavOptions = {
  root: null,
  threshold: [0, 1],
  rootMargin: `${navBar.getBoundingClientRect().height}px`,
};

const stickyNavObserver = new IntersectionObserver(stickyNav, stickyNavOptions);
stickyNavObserver.observe(document.querySelector('.section--about'));

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (el) {
    el.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// HERO VERTICAL OFFSET FOR NAV
document.querySelector('.hero').style.marginTop = `${document.querySelector('header .nav').offsetHeight}px`;
