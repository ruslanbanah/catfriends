(function() {
  'use strict';

  angular
      .module('cats')
      .controller('UserCtrl', function($scope, $state, config, UserService) {
        $scope.page = $state.params.page || 1;
        $scope.key = $state.params.key || 0;
        $scope.users = [];
        $scope.selectUser = {};
        
        $scope.prev = function(){
          if($scope.key<1){
            $scope.key = 0;
            $scope.page = $scope.page - 1;
          }
          return 'user/'+$scope.page+'/'+$scope.key;
        };
        $scope.prevShow = true;
        $scope.prev = {};
        $scope.prev.page = $scope.page*1;
        $scope.prev.key = $scope.key*1;
        if(($scope.prev.page-1+$scope.prev.key) > 0){
          $scope.prev.key = $scope.prev.key - 1;
          if($scope.prev.key<0){
            $scope.prev.page = $scope.prev.page - 1;
            $scope.prev.key = config.ipp - 1;
          }
        }else{
          $scope.prevShow = false;
        }

        $scope.nextShow = true;
        $scope.next = {};
        $scope.next.page = $scope.page*1;
        $scope.next.key = $scope.key*1 + 1;
        if ($scope.next.key >= config.ipp){
          $scope.next.page = $scope.next.page + 1;
          $scope.next.key = 0;
        }

        $scope.submit = function() {
          UserService.update($scope.selectUser._id,{
            name: { first: $scope.selectUser.name.first, last: $scope.selectUser.name.last },
            email: $scope.selectUser.email,
            born: $scope.selectUser.born,
            phone: $scope.selectUser.phone,
          }).then(function(res) {
            console.log(res);
          });
          return false;
        };

       UserService.getPage($scope.page).then(function(res) {
         $scope.users = res;
         $scope.selectUser = $scope.users[$scope.key];
         $scope.$apply();
         console.log($scope.users[$scope.key]);
       });
      });
})();
