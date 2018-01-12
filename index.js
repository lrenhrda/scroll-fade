// scrollfade.js
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (el, options) {

  Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
  };

  var opts = _.defaultsDeep(options, {
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
  var unit = (0, _cssGetUnit2.default)(el.dataset.fadeDuration || opts.fadeDuration);
  var value = parseFloat(el.dataset.fadeDuration || opts.fadeDuration);

  // Convert the duration value to a physical pixel size:
  var max = value;
  if (unit == '%') max = value / 100 * document.body.clientHeight;
  if (unit == 'vh') max = value / 100 * window.innerHeight;
  if (unit == 'px') max = value;

  var anim = (0, _animejs2.default)({
    targets: el,
    opacity: [opts.fadeStart, opts.fadeEnd],
    easing: opts.fadeEasing,
    duration: 5000,
    autoplay: false
  });

  function getPosition() {
    var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return (scroll / max).clamp(0, 1);
  };

  var tick = _.throttle(function () {
    anim.seek(anim.duration * getPosition());
  }, 10);

  window.addEventListener('load', tick, false);
  window.addEventListener('scroll', tick, false);
  window.addEventListener('resize', tick, false);
};

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _animejs = require('animejs');

var _animejs2 = _interopRequireDefault(_animejs);

var _cssGetUnit = require('css-get-unit');

var _cssGetUnit2 = _interopRequireDefault(_cssGetUnit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

;
