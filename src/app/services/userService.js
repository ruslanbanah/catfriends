(function() {
  'use strict';

  angular.module('cats').factory('UserService', [
    '$http',
    'config',
    function($http, config) {
      var mem_page = [];
      var mem_users = [];
      return {
        getPage: function(page) {
          return new Promise(function(resolved, reject) {
            if (mem_page != page) {
              $http({
                method: 'get',
                url: config.url + '/users',
                params: {limit: config.ipp, page: page}
              }).then(function(res) {
                mem_users = res.data.docs.map(function(item) {
                  item.born = new Date(item.born);
                  return item;
                });
                mem_page = page;
                resolved(mem_users);
              }, function(err) {
                reject(err);
              });
            } else {
              resolved(mem_users);
            }
          });
        },
        update: function(id, params) {
          return $http.put(config.url + '/users/' + id, params);
        }
      }
    }
  ]);
})();