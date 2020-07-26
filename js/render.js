'use strict';

(function () {
  var PIN = {
    width: 50,
    height: 70
  };
  var MAX_SIMILAR_PIN_COUNT = 5;

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

  window.render = function (list) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_SIMILAR_PIN_COUNT; i++) {
      fragment.appendChild(renderPinElement(list[i]));
    }
    mapPinsList.appendChild(fragment);
    console.log(window.filter.type);
  };
})();
