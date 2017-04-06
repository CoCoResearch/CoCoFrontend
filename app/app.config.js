/**
 * Created by Lina8a on 06/04/2017.
 */

'use strict';

angular.
    module('cocoApp').
    config(['$locationProvider' ,'$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/', {
                    template: '<home></home>'
                }).
                when('/configurator', {
                    template: '<configurator></configurator>'
                }).
                otherwise('/');
        }
    ]);
