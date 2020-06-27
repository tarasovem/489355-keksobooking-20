"use strict";

(function () {
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
      return window.util.getRandomInteger(minXCoordinate, maxXCoordinate);
    };

    var MIN_Y_COORDINATION = 130;

    var MAX_Y_COORDINATION = 630;

    var getLocationY = function () {
      return window.util.getRandomInteger(MIN_Y_COORDINATION, MAX_Y_COORDINATION);
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
          price: window.util.getRandomInteger(5000, 100000),
          type: TYPE[window.util.getRandomInteger(0, TYPE.length - 1)],
          rooms: window.util.getRandomInteger(1, 3),
          guests: window.util.getRandomInteger(0, 2),
          checkin: TIME[window.util.getRandomInteger(0, TIME.length - 1)],
          checkout: TIME[window.util.getRandomInteger(0, TIME.length - 1)],
          features: featuresList.slice(window.util.getRandomInteger(1, featuresList.length) - 1),
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

  window.data = {
    createDataList: createDataList
  }
})();
