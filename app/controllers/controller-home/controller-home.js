'use strict';

angular.module('cocoApp').
    component('home', {
      templateUrl: 'views/view-home/view-home.html',
      controller: 'HomeController'
    });

angular.module('cocoApp').
    controller('HomeController', ['$routeParams', function($routeParams) {

    }]);