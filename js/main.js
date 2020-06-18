'use strict';

var getRandomInteger = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var mapArea = document.querySelector('.map__pins');

var PIN = {
  width: 50,
  height: 70
};

var createNumbersArray = function (from, to) {
  var arr = [];
  for (var i = from - 1; i < to; i++) {
    arr[i] = i + 1;
  }
  return arr;
};

var numberFormat = function (num) {
  return ('0' + num).slice(-2);
};

var USER_COUNT = 8;

var createDataList = function () {
  var getAvatarSrcList = function () {
    var list = [];
    var serialNumbers = createNumbersArray(1, USER_COUNT);

    for (var i = 0; i < USER_COUNT; i++) {
      var number;

      serialNumbers.sort(function () {
        return 0.5 - Math.random();
      });

      number = serialNumbers.pop();

      list.push('img/avatars/user' + numberFormat(number) + '.png');
    }

    return list;
  };

  var minXCoordinate = PIN.width / 2;

  var maxXCoordinate = mapArea.clientWidth - PIN.width / 2;

  var getLocationX = function () {
    return getRandomInteger(minXCoordinate, maxXCoordinate);
  };

  var MIN_Y_COORDINATION = 130;

  var MAX_Y_COORDINATION = 630;

  var getLocationY = function () {
    return getRandomInteger(MIN_Y_COORDINATION, MAX_Y_COORDINATION);
  };

  var avatarSrcList = getAvatarSrcList();

  var mock = [];

  for (var i = 0; i < avatarSrcList.length; i++) {
    var coordX = getLocationX();
    var coordY = getLocationY();
    var featuresList = FEATURES.sort(function () {
      return Math.random() - 0.5;
    });

    var obj = {
      'author': {
        avatar: avatarSrcList[i],
      },
      'offer': {
        title: 'Заголовок объявления',
        address: coordX + ', ' + coordY,
        price: getRandomInteger(5000, 100000),
        type: TYPE[getRandomInteger(0, TYPE.length - 1)],
        rooms: getRandomInteger(1, 3),
        guests: getRandomInteger(0, 2),
        checkin: TIME[getRandomInteger(0, TIME.length - 1)],
        checkout: TIME[getRandomInteger(0, TIME.length - 1)],
        features: featuresList.slice(getRandomInteger(1, featuresList.length) - 1),
        description: 'Строка с описанием',
        photos: PHOTOS.sort(function () {
          return Math.random() - 0.5;
        }),
      },
      'location': {
        x: coordX,
        y: coordY,
      }
    };

    mock.push(obj);
  }

  return mock;
};

var dataList = createDataList();

var mapPinsList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPinElement = function (data) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style.left = data.location.x - PIN.width / 2 + 'px';
  pinElement.style.top = data.location.y - PIN.height + 'px';

  pinElement.querySelector('img').setAttribute('src', data.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', data.offer.title);

  return pinElement;
};

var renderPinsList = function (list) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataList.length; i++) {
    fragment.appendChild(renderPinElement(list[i]));
  }
  mapPinsList.appendChild(fragment);
};

renderPinsList(dataList);


var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
var mapFiltersSelects = document.querySelectorAll('.map__filters select');

var disableElements = function () {
  if (!map.classList.contains('map--faded')) {
    map.classList.add('map--faded');
  }

  if (!adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.add('ad-form--disabled');
  }

  for (var i = 0; i < adFormFieldsets.length; i++) {
    if (!adFormFieldsets[i].hasAttribute('disabled')) {
      adFormFieldsets[i].setAttribute('disabled', '');
    }
  }

  for (var j = 0; j < mapFiltersSelects.length; j++) {
    if (!mapFiltersSelects[j].hasAttribute('disables')) {
      mapFiltersSelects[j].setAttribute('disabled', '');
    }
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

var mainMapPin = document.querySelector('.map__pin--main');

var setAddress = function (x, y) {
  var addressInput = document.querySelector('#address');

  addressInput.value = x + ', ' + y;
};

var documentLoadHandler = function () {
  disableElements();
  setAddress(getElementCoord(mainMapPin).top + MAIN_MAP_PIN.disabled.width / 2, getElementCoord(mainMapPin).left + MAIN_MAP_PIN.disabled.height / 2);
};

document.addEventListener('DOMContentLoaded', documentLoadHandler);

var enableElements = function () {
  if (map.classList.contains('map--faded')) {
    map.classList.remove('map--faded');
  }

  if (adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.remove('ad-form--disabled');
  }

  for (var i = 0; i < adFormFieldsets.length; i++) {
    if (adFormFieldsets[i].hasAttribute('disabled')) {
      adFormFieldsets[i].removeAttribute('disabled');
    }
  }

  for (var j = 0; j < mapFiltersSelects.length; j++) {
    if (mapFiltersSelects[j].hasAttribute('disables')) {
      mapFiltersSelects[j].removeAttribute('disabled');
    }
  }
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
