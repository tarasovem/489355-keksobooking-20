'use strict';

(function () {
  var roomsNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var setCapacityWarningMessage = function () {
    var roomsNumberSelectValue = roomsNumberSelect.value;
    var capacitySelectValue = capacitySelect.value;

    if (roomsNumberSelectValue === '100' && capacitySelectValue !== '0') {
      capacitySelect.setCustomValidity('Гостей приглашать нельзя!');
    } else if (roomsNumberSelectValue < capacitySelectValue) {
      capacitySelect.setCustomValidity('Количество комнат мало для такого количества гостей!');
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  var roomsNumberSelectInputHandler = function () {
    setCapacityWarningMessage();
  };

  capacitySelect.addEventListener('input', roomsNumberSelectInputHandler);

  var capacitySelectInputHandler = function () {
    setCapacityWarningMessage();
  };

  roomsNumberSelect.addEventListener('input', capacitySelectInputHandler);

  var mainMapPinMousedownHandler = function (evt) {
    if (evt.button === 0) {
      enableElements();
      setAddress(getElementCoord(mainMapPin).top + MAIN_MAP_PIN.enabled.width / 2, getElementCoord(mainMapPin).left + MAIN_MAP_PIN.enabled.height);
      setCapacityWarningMessage();
    }
  };

  mainMapPin.addEventListener('mousedown', mainMapPinMousedownHandler);

  var mainMapPinKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      enableElements();
      setAddress(getElementCoord(mainMapPin).top + MAIN_MAP_PIN.enabled.width / 2, getElementCoord(mainMapPin).left + MAIN_MAP_PIN.enabled.height);
      setCapacityWarningMessage();
    }
  };

  mainMapPin.addEventListener('keydown', mainMapPinKeydownHandler);

})();
