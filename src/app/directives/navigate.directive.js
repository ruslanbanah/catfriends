(function() {
  'use strict';

  angular
      .module('cats')
      .directive('navigate', navigateUser);

  function navigateUser(config) {
    var directive = {
      link: link,
      templateUrl: 'app/views/directives/navigate.html',
      restrict: 'E',
      scope: {
        page: '=page',
        userIndex: '=userIndex'
      }
    };
    return directive;

    function link(scope, element, attrs) {
      scope.prevShow = true;
      scope.prev = {};
      scope.prev.page = parseInt(scope.page);
      scope.prev.userIndex = parseInt(scope.userIndex);
      if ((scope.prev.page - 1 + scope.prev.userIndex) > 0) {
        scope.prev.userIndex = scope.prev.userIndex - 1;
        if (scope.prev.userIndex < 0) {
          scope.prev.page = scope.prev.page - 1;
          scope.prev.userIndex = config.itemPerPage - 1;
        }
      } else {
        scope.prevShow = false;
      }

      scope.nextShow = true;
      scope.next = {};
      scope.next.page = parseInt(scope.page);
      scope.next.userIndex = parseInt(scope.userIndex) + 1;
      if (scope.next.userIndex >= config.itemPerPage) {
        scope.next.page = scope.next.page + 1;
        scope.next.userIndex = 0;
      }
    }
  }
})();