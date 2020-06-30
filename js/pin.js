'use strict';

(function () {
  var mapPinsList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPinElement = function (data) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style.left = data.location.x - window.data.PIN.width / 2 + 'px';
    pinElement.style.top = data.location.y - window.data.PIN.height + 'px';

    pinElement.querySelector('img').setAttribute('src', data.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', data.offer.title);

    return pinElement;
  };

  var renderPinsList = function (list) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < list.length; i++) {
      fragment.appendChild(renderPinElement(list[i]));
    }
    mapPinsList.appendChild(fragment);
  };

  window.pin = {
    renderPinsList: renderPinsList
  }
})();
