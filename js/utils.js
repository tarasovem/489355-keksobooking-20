'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  window.utils = {
    getRandomInteger: getRandomInteger
  };
})();
