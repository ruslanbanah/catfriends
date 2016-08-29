(function() {
  'use strict';

  angular.module('cats').factory('UserService', [
    '$http',
    'config',
    UserService
  ]);

  function UserService($http, config) {
    var cache = [];
    var oldPage = null;
    var selectUser = null;
    var service = {
      getUser: getUser,
      updateUser: updateUser
    };

    return service;

    ////////////

    function getUser(page, userIndex) {
      return new Promise(function(resolved, reject) {
        if (oldPage != page) {
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