// scrollfade.js
'use strict';

import * as _ from 'lodash';
import anime from 'animejs';
import getCSSUnit from 'css-get-unit';

export default function(el, options) {

  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };

  let opts = _.defaultsDeep({
    fadeStart: 0,
    fadeEnd: 1,
    fadeEasing: 'linear',
    fadeDuration: '100vh'
  }, options);

  /**
   * Since this is an interactively-controlled animation,
   * duration is not based on a length of time but on a
   * distance of pixels.
   */
  let unit = getCSSUnit(el.dataset.fadeDuration || opts.fadeDuration);
  let value = parseFloat(el.dataset.fadeDuration || opts.fadeDuration);

  // Convert the duration value to a physical pixel size:
  let max = value;
  if(unit == '%') max = (value / 100) * document.body.clientHeight;
  if(unit == 'vh') max = (value / 100) * window.innerHeight;
  if(unit == 'px') max = value;

  let anim = anime({
    targets: el,
    opacity: [opts.fadeStart, opts.fadeEnd],
    easing: opts.fadeEasing,
    duration: 5000,
    autoplay: false
  });

  function getPosition() {
    let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return (scroll / max).clamp(0, 1);
  };

  let tick = _.throttle(()=> {
    anim.seek(anim.duration * getPosition());
  }, 10);

  window.addEventListener('load', tick, false);
  window.addEventListener('scroll', tick, false);
  window.addEventListener('resize', tick, false);
};
