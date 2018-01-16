// scrollfade.js
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (el, options) {

  Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
  };

  var opts = (0, _lodash4.default)(el.dataset, options, {
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
    var unit = (0, _cssGetUnit2.default)(n);
    var value = parseFloat(n);
    return { unit: unit, value: value };
  }

  // Convert the duration value to a physical pixel size:
  var fadeDuration = parseUnit(opts.fadeDuration);
  var max = fadeDuration.value;
  if (fadeDuration.unit == '%') max = fadeDuration.value / 100 * document.body.clientHeight;
  if (fadeDuration.unit == 'vh') max = fadeDuration.value / 100 * window.innerHeight;
  if (fadeDuration.unit == 'px') max = fadeDuration.value;

  // TODO: Add delay functionality
  var anim = (0, _animejs2.default)({
    targets: el,
    opacity: [opts.fadeStart, opts.fadeEnd],
    easing: opts.fadeEasing,
    duration: 5000,
    autoplay: false
  });

  function getPosition() {
    var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // console.log('scroll:', scroll, 'max:', max);
    return (scroll / max).clamp(0, 1);
  };

  var tick = (0, _lodash2.default)(function () {
    anim.seek(anim.duration * getPosition());
  }, 10);

  window.addEventListener('load', tick, false);
  window.addEventListener('scroll', tick, false);
  window.addEventListener('resize', tick, false);
};

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.defaultsdeep');

var _lodash4 = _interopRequireDefault(_lodash3);

var _animejs = require('animejs');

var _animejs2 = _interopRequireDefault(_animejs);

var _cssGetUnit = require('css-get-unit');

var _cssGetUnit2 = _interopRequireDefault(_cssGetUnit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;