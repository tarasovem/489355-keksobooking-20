'use strict';

(function () {
  var PIN = {
    width: 50,
    height: 70
  };

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
    while (mapPinsList.children.length > 2) {
      mapPinsList.removeChild(mapPinsList.lastChild);
    }

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < list.length; i++) {
      fragment.appendChild(renderPinElement(list[i]));
    }

    mapPinsList.appendChild(fragment);
  };
})();
