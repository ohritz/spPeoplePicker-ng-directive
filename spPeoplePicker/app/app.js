(function() {
    'use strict';
    var controllerId = 'peoplePickerDemo';
    angular.module('app',[]).controller(controllerId, ['$scope', peoplePickerDemo]);

    function peoplePickerDemo($scope) {

        $scope.getAllInfo = ($scope.allInfo) ? true : false;
    }
})();