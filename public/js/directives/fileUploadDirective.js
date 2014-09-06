var fileUploadDirective = function(fileUploadService) {
    return {
        restrict: 'E',
        template: "<input type='file' name='file' onchange='angular.element(this).scope().uploadPhoto(this.files)' />",
        scope: {
            personId: '=',
            submitFunc: '='
        },
        link: link
    }

    function link(scope, el, attrs) {
        scope.uploadPhoto = function(files) {
            return scope.submitFunc(scope.personId, files)
        }
    }
}