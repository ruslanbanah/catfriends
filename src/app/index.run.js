(function() {
  'use strict';

  angular
      .module('cats')
      .run(function($log) {
        $log.debug('run Cat friends.');
      });

})();
