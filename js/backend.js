'use strict';

(function () {
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking/data';
  var SERVER_STATUS = {
    OK: 200
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.open('GET', SAVE_URL);

      xhr.addEventListener('load', function () {
        if (xhr.status === SERVER_STATUS.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.send();
    }
  };
})();
