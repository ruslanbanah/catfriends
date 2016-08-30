(function() {
  'use strict';

  angular
      .module('cats')
      .directive('userProfile', userProfile);

  function userProfile() {
    var directive = {
      link: link,
      templateUrl: 'app/views/directives/user.profile.html',
      restrict: 'E'
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }

})();
