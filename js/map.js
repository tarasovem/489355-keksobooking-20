'use strict';


(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var mapFiltersSelects = document.querySelectorAll('.map__filters select');

  var disableElements = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].setAttribute('disabled', '');
    }

    for (var j = 0; j < mapFiltersSelects.length; j++) {
      mapFiltersSelects[j].setAttribute('disabled', '');
    }
  };

  var MAIN_MAP_PIN = {
    disabled: {
      width: 62,
      height: 62,
    },
    enabled: {
      width: 62,
      height: 84,
    },
  };

  var getElementCoord = function (elem) {
    return {
      top: elem.offsetTop,
      left: elem.offsetLeft
    };
  };

  var enableElements = function () {
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
    }

    if (adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
    }

    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].removeAttribute('disabled');
    }

    for (var j = 0; j < mapFiltersSelects.length; j++) {
      mapFiltersSelects[j].removeAttribute('disabled');
    }
  };

  window.map = {
    MAIN_MAP_PIN: MAIN_MAP_PIN,
    enableElements: enableElements,
    disableElements: disableElements,
    getElementCoord: getElementCoord
  };
})();
