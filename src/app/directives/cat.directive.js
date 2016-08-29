(function() {
  'use strict';

  angular
      .module('cats')
      .directive('cat', cat);

  function cat() {
    var directive = {
      link: link,
      templateUrl: 'app/views/directives/cat.html',
      restrict: 'E'
    };
    return directive;

    function link(scope, element, attrs) {
      /* */
    }
  }
})();