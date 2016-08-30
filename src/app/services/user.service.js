(function() {
  'use strict';

  angular.module('cats').factory('UserService', [
    '$http',
    '$q',
    'usSpinnerService',
    'config',
    UserService
  ]);

  function UserService($http, $q, usSpinnerService, config) {
    var cache = [];
    var oldPage = null;
    var selectUser = null;
    var service = {
      getUser: getUser,
      updateUser: updateUser
    };

    return service;
    
    function getUser(page, userIndex) {
      return $q(function(resolved, reject) {
        if (oldPage != page) {
          usSpinnerService.spin('spinner');
          $http({
            method: 'get',
            url: config.url + '/users',
            params: { limit: config.itemPerPage, page: page }
          }).then(
              function(resp) {
                cache = resp.data.docs;
                oldPage = page;
                selectUser = cache[userIndex];
                selectUser.born = new Date(selectUser.born);
                usSpinnerService.stop('spinner');
                resolved(selectUser);
              },
              reject
          );
        } else {
          selectUser = cache[userIndex];
          selectUser.born = new Date(selectUser.born);
          resolved(selectUser);
        }
      });
    }

    function updateUser(id, params) {
      return $http.put(config.url + '/users/' + id, params);
    }
  }
})();