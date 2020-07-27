'use strict';

(function () {
  window.utils = {
    getRandomInteger: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getRandomSort: function () {
      return Math.random() - 0.5;
    },
    debounce: function (cb, interval) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, interval);
      };
    }
  };
})();
