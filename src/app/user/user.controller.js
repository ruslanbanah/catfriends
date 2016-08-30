(function() {
  'use strict';

  angular
      .module('cats')
      .controller('UserCtrl', UserCtrl);

  function UserCtrl($scope, $state, UserService) {
    $scope.page = $state.params.page || 1;
    $scope.userIndex = $state.params.userIndex || 0;

    $scope.users = {};
    $scope.selectUser = {};

    $scope.submit = function() {
      var params = {
        name: { first: $scope.selectUser.name.first, last: $scope.selectUser.name.last },
        email: $scope.selectUser.email,
        born: $scope.selectUser.born,
        phone: $scope.selectUser.phone
      };

      UserService.updateUser($scope.selectUser._id, params)
          .then(function(res) {
                console.log(res);
              },
              function(err) {
                console.log(err);
              }
          );
      return false;
    };

    UserService.getUser($scope.page, $scope.userIndex).then(function(user) {
      $scope.selectUser = user;
    });
  }

})();
