(function() {
  'use strict';

  angular
      .module('cats')
      .directive('backImage', backImage);

  function backImage() {
    return function(scope, element, attrs) {
      var url = attrs.backImage;
      element.css({
        'background-image': 'url(' + url + ')',
        'background-size': 'cover'
      });
    }
  }
})();
