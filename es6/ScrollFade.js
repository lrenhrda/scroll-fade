// scrollfade.js
'use strict';

import throttle from 'lodash.throttle';
import defaultsDeep from 'lodash.defaultsdeep'
import anime from 'animejs';
import getCSSUnit from 'css-get-unit';

export default function(el, options) {

  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };

  let opts = defaultsDeep(el.dataset, options, {
    fadeStart: 0,
    fadeEnd: 1,
    fadeEasing: 'linear',
    fadeDuration: '100vh'
  });

  /**
   * Since this is an interactively-controlled animation,
   * duration is not based on a length of time but on a
   * distance of pixels.
   */
  function parseUnit(n) {
    let unit = getCSSUnit(n);
    let value = parseFloat(n);
    return { unit, value }
  }

  // Convert the duration value to a physical pixel size:
  let fadeDuration = parseUnit(opts.fadeDuration)
  let max = fadeDuration.value;
  if(fadeDuration.unit == '%') max = (fadeDuration.value / 100) * document.body.clientHeight;
  if(fadeDuration.unit == 'vh') max = (fadeDuration.value / 100) * window.innerHeight;
  if(fadeDuration.unit == 'px') max = fadeDuration.value;

  // TODO: Add delay functionality
  let anim = anime({
    targets: el,
    opacity: [opts.fadeStart, opts.fadeEnd],
    easing: opts.fadeEasing,
    duration: 5000,
    autoplay: false
  });

  function getPosition() {
    let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // console.log('scroll:', scroll, 'max:', max);
    return (scroll / max).clamp(0, 1);
  };

  let tick = throttle(()=> {
    anim.seek(anim.duration * getPosition());
  }, 10);

  window.addEventListener('load', tick, false);
  window.addEventListener('scroll', tick, false);
  window.addEventListener('resize', tick, false);
};
