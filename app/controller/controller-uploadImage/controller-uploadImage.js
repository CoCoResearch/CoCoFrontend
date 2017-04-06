'use strict';

angular.module('cocoApp.uploadImage', [
  'ngRoute'
])

angular.module('cocoApp.uploadImage').
    component('cocoApp.uploadImage', {
      templateUrl: 'views/view-home/view-home.html',
      controller: ['$routeParams',
        function UploadImageController($routeParams) {
          var self = this;
          self.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
            self.setImage(phone.images[0]);
          });

          self.setImage = function setImage(imageUrl) {
            self.mainImageUrl = imageUrl;
          };
        }
      ]
    });