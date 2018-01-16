import ScrollFade from './ScrollFade.js';

document.addEventListener("DOMContentLoaded", function() {
  let elems = document.getElementsByClassName('fadeElement')
  Array.from(elems).forEach(elem => {
    ScrollFade(elem)
  })
})