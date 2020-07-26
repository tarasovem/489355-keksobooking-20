'use strict';

(function () {
  var pins = [];

  var updatePins = function (list) {

    window.render(list);
  };

  var successLoadHandler = function (data) {
    pins = data;
    updatePins(pins);
  };

  var errorLoadHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(function () {
      node.remove();
    }, 1500);
  };

  window.backend.load(successLoadHandler, errorLoadHandler);

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
