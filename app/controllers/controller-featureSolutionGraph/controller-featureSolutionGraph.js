'use strict';

/**
 * Relating Feature Model view and controller.
 */
angular.module('cocoApp').
    component('featureSolutionGraph', {
      templateUrl: '../../views/view-featureSolutionGraph/view-featureSolutionGraph.html',
      controller: 'FeatureSolutionGraphController'
    });

/**
 * Creating Feature Model controller.
 */
angular.module('cocoApp').
    controller('FeatureSolutionGraphController', ['$scope', '$http', '$location', 'SERVER_NAME', function($scope, $http, $location, serverName) {

        //-----------------------------------------------------------
        // Get FMs
        //-----------------------------------------------------------

        /**
         * Get the list of feature models in the data base.
         * This is used to feed the view feature models table.
         */
        $scope.getFeatureSolutionGraphs = function() {
            $http({
                method: 'GET',
                url: serverName + '/featureSolutionGraphs',
            }).then(function successCallback(response){
                $scope.featureSolutionGraphs = response.data.body;
            }, function errorCallback(response){
                console.log(response);
            });
        }

        $scope.getFeatureSolutionGraphs();


        //-----------------------------------------------------------
        // Create FM
        //-----------------------------------------------------------

        /**
         * Initializing the featureModel structure which obtains the
         * information from the user form.
         * @type {{}}
         */
        $scope.featureSolutionGraph = {};

        /**
         * Functionality related to the Add Feature Model modal.
         * Code taken from http://ilevin350.com/jekyll/update/2016/03/17/creating-modal-dialogs-with-angular-js-and-custom-directives.html
         */
        $scope.modalAddFeatureSolutionGraph = false;
        $scope.toggleAddFeatureSolutionGraph = function() {
            $scope.modalAddFeatureSolutionGraph = !$scope.modalAddFeatureSolutionGraph;
        }

        /**
         * Submits the information of the feature model add form if
         * all data is well-formed and required data is provided.
         */
        $scope.submitAddFeatureSolutionGraphForm = function(formAddFeatureSolutionGraph) {
            if(formAddFeatureSolutionGraph.$valid){
                var file = document.getElementById("featureSolutionGraph.file").files[0];
                var isValid = reviewFileExtension(file.name);

                if(isValid){
                    $scope.featureSolutionGraph.file = file;

                    var payload = new FormData();
                    payload = createFeatureModelPayload();

                    $http({
                     method: 'POST',
                     url: serverName + '/featureSolutionGraphs',
                     headers: {'Content-type' : undefined},
                     data: payload,
                     }).then(function successCallback(response){
                        console.log("Good");
                        $scope.toggleAddFeatureSolutionGraph();
                        $scope.getFeatureSolutionGraphs();
                     }, function errorCallback(response){
                        console.log(response);
                        $scope.toggleAddFeatureSolutionGraph();
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
                    $scope.featureSolutionGraph.extension = extension;
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

            payload.append('owner', $scope.featureSolutionGraph.owner);
            payload.append('ownerEmail', $scope.featureSolutionGraph.ownerEmail);
            payload.append('name', $scope.featureSolutionGraph.name);
            payload.append('description', $scope.featureSolutionGraph.description);
            payload.append('extension', $scope.featureSolutionGraph.extension);
            payload.append('file', $scope.featureSolutionGraph.file);

            return payload;
        }

        //-----------------------------------------------------------
        // Redirection
        //-----------------------------------------------------------

        $scope.redirectToConfigurator = function(featureModelId) {
            console.log("Id " + featureModelId);
            $location.path('/configurator/' + featureModelId);
        }
    }
    ]);