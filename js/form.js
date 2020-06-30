'use strict';

(function () {
  var setAddress = function (x, y) {
    var addressInput = document.querySelector('#address');

    addressInput.value = x + ', ' + y;
  };

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

  window.form = {
    setAddress: setAddress,
    setCapacityWarningMessage: setCapacityWarningMessage
  }
})();
