'use strict';

// INTERSECTION OBSERVER API - FADE SECTIONS IN ON SCROLL

// HTML Data Attributes for desired targets:
// data-fade
// data-fade-axis (optional, Y default)
// data-fade-offset (optional, -8rem default)

// CSS requirements
// .fade {transition: opacity 1s, transform 1s;}
// .fade--hidden {opacity: 0;}

const fadeOnScrollOptions = {
  root: null, // use viewport as root
  threshold: 0.1,
};

function fadeOnScroll(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('fade--hidden');
    let axis = entry.target.dataset.fadeAxis ? entry.target.dataset.fadeAxis.toUpperCase() : 'Y';
    entry.target.style.transform = `translate${axis}(0)`;
    observer.unobserve(entry.target);
  });
}

const observer = new IntersectionObserver(fadeOnScroll, fadeOnScrollOptions);
const allFadeItems = document.querySelectorAll('[data-fade]');

allFadeItems.forEach(el => {
  el.classList.add('fade', 'fade--hidden'); // add classes with JS so no damage for non-JS users
  let axis = el.dataset.fadeAxis ? el.dataset.fadeAxis.toUpperCase() : 'Y';
  let offset = el.dataset.fadeOffset ? el.dataset.fadeOffset : '8rem';
  el.style.transform = `translate${axis}(${offset})`;
  observer.observe(el);
});
