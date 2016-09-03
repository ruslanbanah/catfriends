(function() {
  'use strict';
  
  angular
      .module('cats', [
        'ui.router',
        'ui.bootstrap',
        'underscore',
        'angular-loading-bar',
        'angularSpinner'
      ])
      .run(function($log) {
        $log.debug('run Cat friends.');
      });

})();
