/**
 * Created by Lina8a on 06/04/2017.
 */

'use strict';

/**
 * Defining the app routes. A constant with the server name
 * is also defined.
 */
angular.module('cocoApp')
    .config(['$locationProvider' ,'$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/', {
                    template: '<home></home>'
                }).
                when('/configurator', {
                    template: '<feature-solution-graph></feature-solution-graph>'
                }).
                when('/configurator/:featureSolutionGraphId', {
                    template: '<configurator></configurator>'
                }).
                otherwise('/');
        }
    ])
    .constant('SERVER_NAME', 'http://localhost:9000');
