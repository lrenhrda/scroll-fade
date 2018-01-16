'use strict';

var _ScrollFade = require('./ScrollFade.js');

var _ScrollFade2 = _interopRequireDefault(_ScrollFade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.getElementsByClassName('fadeElement');
  Array.from(elems).forEach(function (elem) {
    (0, _ScrollFade2.default)(elem);
  });
});