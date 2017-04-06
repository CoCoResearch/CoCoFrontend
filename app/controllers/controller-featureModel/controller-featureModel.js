'use strict';

angular.module('cocoApp').
    component('featureModel', {
      templateUrl: 'views/view-featureModel/view-featureModel.html',
      controller: 'FeatureModelController'
    });

angular.module('cocoApp').
    controller('FeatureModelController', ['$routeParams', '$scope', function($routeParams, $scope) {

      //Code taken from http://ilevin350.com/jekyll/update/2016/03/17/creating-modal-dialogs-with-angular-js-and-custom-directives.html
        $scope.modalAddFeatureModel = false;
        $scope.toggleModal = function() {
        $scope.modalAddFeatureModel = !$scope.modalAddFeatureModel;
        }
    }
    ]);