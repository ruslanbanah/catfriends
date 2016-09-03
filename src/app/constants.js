(function() {
  'use strict';
  
  angular.module('cats')
      .constant('config', {
        url: 'http://146.185.137.61:3000/api',
        itemPerPage: 10
      });
})();
