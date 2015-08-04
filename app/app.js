(function() {
    'use strict';
    var controllerId = 'peoplePickerDemo';
    angular.module('app', ["sfSpUtils"]).controller(controllerId, [peoplePickerDemo]);

    function peoplePickerDemo() {
        var vm = this;
        //vm.people1 = [];
        vm.addPerson = function() {
            vm.people1 = [];
            vm.people1.push({ Key: "i:0#.f|membership|admin@sohantst2.onmicrosoft.com", DisplayText: "admin admin" });
        }
        vm.remove = function () {
            vm.people1.pop();
        }
    }
})();