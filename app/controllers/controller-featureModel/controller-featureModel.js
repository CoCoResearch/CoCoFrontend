'use strict';

angular.module('cocoApp').
    component('featureModel', {
      templateUrl: 'views/view-featureModel/view-featureModel.html',
      controller: 'FeatureModelController'
    });

angular.module('cocoApp').
    controller('FeatureModelController', ['$routeParams', '$scope', '$http', 'SERVER_NAME', function($routeParams, $scope, $http, serverName) {
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
                    $http({
                     method: 'POST',
                     url: serverName + '/featureModel',
                     data: $scope.featureModel,
                     }).then(function successCallback(response){

                     }, function errorCallback(response){

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
                }
            }
            return isValid;
        }
    }
    ]);