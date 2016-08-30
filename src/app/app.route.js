(function() {
  'use strict';

  angular
      .module('cats')
      .config(routeConfig)
      .config(configSpinner);

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/user/1/0");
    $stateProvider
        .state('user', {
          url: "/user/:page/:userIndex",
          templateUrl: "app/views/user/user.html",
          controller: 'UserCtrl'
        });
  }

  function configSpinner(usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({color: '#00b9ad'});
  }

})();
