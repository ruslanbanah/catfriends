(function() {
  'use strict';

  angular
      .module('cats')
      .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/user/1/0");
    $stateProvider
        .state('user', {
          url: "/user/:page/:key",
          templateUrl: "app/user/user.html",
          controller: 'UserCtrl'
        });
  }

})();
