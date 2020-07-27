'use strict';

(function () {
  var typeFilter = document.querySelector('#housing-type');

  var filter = {
    onTypeChange: function (type) {
      window.main.filter.type = type;
      window.main.updatePins();
    }
  };

  typeFilter.addEventListener('change', function (evt) {
    var type = evt.target.value;
    filter.onTypeChange(type);
  });

  window.filter = filter;
})();
