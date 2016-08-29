(function() {
  'use strict';

  angular
      .module('cats')
      .directive('friend', friend);

  function friend() {
    var directive = {
      link: link,
      templateUrl: 'app/views/directives/friend.html',
      restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
    
    }
  }
})();