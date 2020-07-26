'use strict';

(function () {
  var typeFilter = document.querySelector('#housing-type');

  var mapFilter = {
    type: ''
  }

  typeFilter.addEventListener('change', function (evt) {
    mapFilter.type = evt.target.value;
  });

  window.filter = {
    type: mapFilter.type
  }
})();
