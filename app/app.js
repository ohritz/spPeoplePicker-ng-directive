(function() {
    'use strict';
    var controllerId = 'peoplePickerDemo';
    angular.module('app',[]).controller(controllerId, ['$scope', peoplePickerDemo]);

    function peoplePickerDemo() {
        var vm = this;
    }
})();