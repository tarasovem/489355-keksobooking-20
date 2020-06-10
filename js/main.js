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
  width: 62,
  height: 84
};

var createDataList = function () {
  var getAvatarSrcList = function () {
    var list = [];
    var serialNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

    for (var i = 0; i < 8; i++) {
      var number;

      serialNumbers.sort(function () {
        return 0.5 - Math.random();
      });

      number = serialNumbers.pop();

      list.push('img/avatars/user0' + number + '.png');
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
    var obj = {
      'author': {},
      'offer': {},
      'location': {}
    };

    obj.author.avatar = avatarSrcList[i];

    obj.offer.title = 'Заголовок объявления';

    var coordX = getLocationX();

    var coordY = getLocationY();

    obj.offer.address = coordX + ', ' + coordY;

    obj.offer.price = getRandomInteger(5000, 100000);

    obj.offer.type = TYPE[getRandomInteger(0, 3)];

    obj.offer.rooms = getRandomInteger(1, 3);

    obj.offer.guests = getRandomInteger(0, 2);

    obj.offer.checkin = TIME[getRandomInteger(0, 2)];

    obj.offer.checkout = TIME[getRandomInteger(0, 2)];

    obj.offer.features = FEATURES.sort(function () {
      return Math.random() - 0.5;
    });

    obj.offer.features = obj.offer.features.slice(getRandomInteger(1, obj.offer.features.length) - 1);

    obj.offer.description = 'Строка с описанием';

    obj.offer.photos = PHOTOS.sort(function () {
      return Math.random() - 0.5;
    });

    obj.offer.photos = obj.offer.photos.slice(getRandomInteger(1, obj.offer.photos.length) - 1);

    obj.location.x = coordX;

    obj.location.y = coordY;

    mock.push(obj);
  }

  return mock;
};

var dataList = createDataList();

var mapPinsList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

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

document.querySelector('.map').classList.remove('map--faded');
