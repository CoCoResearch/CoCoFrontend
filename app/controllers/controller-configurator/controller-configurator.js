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

        $scope.featureModel = {};
        $scope.featureModel.file = null;

        //-----------------------------------------------------------
        // Get FM
        //-----------------------------------------------------------

        /**
         * Get a feature model by a given id.
         */
        $http({
            method: 'GET',
            url: serverName + '/featureSolutionGraphs/' + $routeParams.featureSolutionGraphId,
        }).then(function successCallback(response){
            $scope.featureSolutionGraph = response.data.body;
        }, function errorCallback(response){
            console.log(response);
        });


        //-----------------------------------------------------------
        // Add FM
        //-----------------------------------------------------------

        /**
         * Functionality related to the Add Feature Model modal.
         * Code taken from http://ilevin350.com/jekyll/update/2016/03/17/creating-modal-dialogs-with-angular-js-and-custom-directives.html
         */
        $scope.modalAddFeatureModel = false;
        $scope.toggleAddFeatureModel = function() {
            $scope.modalAddFeatureModel = !$scope.modalAddFeatureModel;
        }

        $scope.submitAddFeatureModelForm = function(formAddFeatureModel) {
            if(formAddFeatureModel.$valid){
                var file = document.getElementById("featureModel.file").files[0];
                var isValid = reviewFileExtension(file.name);

                if(isValid){
                    $scope.featureModel.file = file;

                    var payload = new FormData();
                    payload = createFeatureModelPayload();

                    $http({
                        method: 'POST',
                        url: serverName + '/featureSolutionGraphs/' + $scope.featureSolutionGraph.id + '/featureModels',
                        headers: {'Content-type' : undefined},
                        data: payload,
                    }).then(function successCallback(response){
                        console.log("Good");
                        $scope.toggleAddFeatureModel();
                    }, function errorCallback(response){
                        console.log(response);
                        $scope.toggleAddFeatureModel();
                    });
                }
            }
        }

        /**
         * Verifies if the extension of a file is includedin the accepted
         * extensions list.
         * @param fileName - String with the file name (name + extension)
         * @returns {boolean} - Return true if the extension is valid
         */
        function reviewFileExtension(fileName) {
            var acceptedExtensions = ["afm"];
            var position = fileName.lastIndexOf(".") + 1;
            var extension = fileName.slice(position);
            var isValid = false;
            console.log(fileName);
            for(var i = 0; i < acceptedExtensions.length; i++){
                if(extension.valueOf() == acceptedExtensions[i].valueOf()){
                    isValid = true;
                }
            }
            return isValid;
        }

        /**
         * Creates the payload of the HTTP request when creating
         * a new feature model.
         * @returns {FormData}
         */
        function createFeatureModelPayload(){
            var payload = new FormData();
            payload.append('file', $scope.featureModel.file);

            return payload;
        }
    }]);