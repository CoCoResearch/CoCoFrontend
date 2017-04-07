/**
 * Created by Lina8a on 07/04/2017.
 */

'use strict';

angular.module('cocoApp').
    component('configurator', {
        templateUrl: 'views/view-configurator/view-configurator.html',
        controller: 'ConfiguratorController'
    });

angular.module('cocoApp').
    controller('ConfiguratorController', ['$routeParams', '$scope', '$http', 'SERVER_NAME', function($routeParams, $scope, $http, serverName) {

        //-----------------------------------------------------------
        // Get FM
        //-----------------------------------------------------------

        /**
         * Get a feature model by a given id.
         */
        $http({
            method: 'GET',
            url: serverName + '/featureModels/' + $routeParams.featureModelId,
        }).then(function successCallback(response){
            $scope.featureModel = response.data.body;
        }, function errorCallback(response){
            console.log(response);
        });
    }]);