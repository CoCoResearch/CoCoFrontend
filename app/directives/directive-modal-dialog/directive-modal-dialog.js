/**
 * Created by Lina8a on 06/04/2017.
 */

/**
 * Declaring the modal dialog directive. It can be used to create
 * new modals along any HTML view. Content is parametrizable.
 * Code taken from http://ilevin350.com/jekyll/update/2016/03/17/creating-modal-dialogs-with-angular-js-and-custom-directives.html
 */
angular.module('cocoApp')
    .directive('modalDialog',function(){
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        transclude: true,
        link: function(scope, element, attrs){
            scope.dialogStyle = {};

            if(attrs.boxWidth) {
                scope.dialogStyle.width = attrs.boxWidth;
            }

            if(attrs.boxHeight) {
                scope.dialogStyle.height = attrs.boxHeight;
            }

            scope.hideModal = function() {
                scope.show = false;
            }
        },
        templateUrl: 'directives/directive-modal-dialog/view-modal-dialog.html'
    }
});
