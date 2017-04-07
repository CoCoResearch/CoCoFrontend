'use strict';

/**
 * Relating Feature Modelview and controller.
 */
angular.module('cocoApp').
    component('featureModel', {
      templateUrl: 'views/view-featureModel/view-featureModel.html',
      controller: 'FeatureModelController'
    });

/**
 * Creating Feature Model controller.
 */
angular.module('cocoApp').
    controller('FeatureModelController', ['$routeParams', '$scope', '$http', 'SERVER_NAME', function($routeParams, $scope, $http, serverName) {

        //-----------------------------------------------------------
        // Get FMs
        //-----------------------------------------------------------

        /**
         * Get the list of feature models in the data base.
         * This is used to feed the view feature models table.
         */
        $http({
            method: 'GET',
            url: serverName + '/featureModels',
        }).then(function successCallback(response){
            $scope.featureModels = response.data.body;
        }, function errorCallback(response){
            console.log(response);
        });


        //-----------------------------------------------------------
        // Create FM
        //-----------------------------------------------------------

        /**
         * Initializing the featureModel structure which obtains the
         * information from the user form.
         * @type {{}}
         */
        $scope.featureModel = {};

        /**
         * Functionality related to the Add Feature Model modal.
         * Code taken from http://ilevin350.com/jekyll/update/2016/03/17/creating-modal-dialogs-with-angular-js-and-custom-directives.html
         */
        $scope.modalAddFeatureModel = false;
        $scope.toggleAddFeatureModelModal = function() {
            $scope.modalAddFeatureModel = !$scope.modalAddFeatureModel;
        }

        /**
         * Submits the information of the feature model add form if
         * all data is well-formed and required data is provided.
         */
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
                     url: serverName + '/featureModels',
                     headers: {'Content-type' : undefined},
                     data: payload,
                     }).then(function successCallback(response){
                        console.log("Good");
                     }, function errorCallback(response){
                        console.log(response);
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
            var acceptedExtensions = ["afm", "xmi"];
            var position = fileName.lastIndexOf(".") + 1;
            var extension = fileName.slice(position);
            var isValid = false;

            for(var i = 0; i < acceptedExtensions.length; i++){
                if(extension.valueOf() == acceptedExtensions[i].valueOf()){
                    isValid = true;
                    $scope.featureModel.extension = extension;
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

            payload.append('owner', $scope.featureModel.owner);
            payload.append('ownerEmail', $scope.featureModel.ownerEmail);
            payload.append('name', $scope.featureModel.name);
            payload.append('description', $scope.featureModel.description);
            payload.append('extension', $scope.featureModel.extension);
            payload.append('file', $scope.featureModel.file);

            return payload;
        }
    }
    ]);