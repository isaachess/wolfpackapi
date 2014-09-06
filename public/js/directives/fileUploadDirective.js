var fileUploadDirective = function(fileUploadService) {
    return {
        restrict: 'E',
        template: "<input type='file' name='file' onchange='angular.element(this).scope().uploadPhoto(this.files)' />",
        scope: {
            user: '='
        },
        link: link
    }

    function link(scope, el, attrs) {
        console.log('boom!')
        scope.uploadPhoto = function(files) {
            return fileUploadService.uploadUserPhoto(scope.user, files)
        }
    }
}