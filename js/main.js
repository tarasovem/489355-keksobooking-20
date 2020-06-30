'use strict';

(function () {

  var dataList = window.data.dataList;

  window.pin.renderPinsList(dataList);

  var mainMapPin = document.querySelector('.map__pin--main');

  document.addEventListener('DOMContentLoaded', function () {
    var elementCoord = window.map.getElementCoord(mainMapPin);

    window.map.disableElements();
    window.form.setAddress(
      elementCoord.top + window.map.MAIN_MAP_PIN.disabled.width / 2,
      elementCoord.left + window.map.MAIN_MAP_PIN.disabled.height / 2
    );
  });

  var mainMapPinHandler = function () {
    var elementCoord = window.map.getElementCoord(mainMapPin);

    window.map.enableElements();
    window.form.setAddress(
      elementCoord.top + window.map.MAIN_MAP_PIN.enabled.width / 2,
      elementCoord.left + window.map.MAIN_MAP_PIN.enabled.height / 2
    );
    window.form.setCapacityWarningMessage();
  };

  mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      mainMapPinHandler();
    }
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      mainMapPinHandler();
    }
  });
})();
