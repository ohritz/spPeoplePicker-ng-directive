var angular = angular || window.angular;
(function (angular) {
    'use strict';
    function spPpJsdepLoader($document) {
        // todo, implement a checking and loading of needed script files for Share Point People Picker
        // using Share Point SOD.
        // need to find a way to check if a library is loaded, what object are each exposing?
        // if not loaded, run a SOD execute?


        //if (!SP.SOD.registerSod) {
        //    var initTag = document.createElement("script");
        //    initTag.src = "/_layouts/15/init.js";
        //    var head = document.getElementsByTagName("head");
        //    head.append(initTag);
        //}
        //SP.SOD.registerSod("sp.js", "/_layouts/15/sp.js");
        //SP.SOD.registerSod("sp.runtime.js", "/_layouts/15/sp.runtime.js");
        //SP.SOD.registerSod("clienttemplates.js", "/_layouts/15/clienttemplates.js");

        //SP.SOD.registerSod("clientforms.js", "/_layouts/15/clientforms.js");
        //SP.SOD.registerSod("clientpeoplepicker.js", "/_layouts/15/clientpeoplepicker.js");
        //SP.SOD.registerSod("autofill.js", "/_layouts/15/autofill.js");

        //SP.SOD.registerSod("sp.core.js", "/_layouts/15/sp.core.js");
        //SP.SOD.registerSod("sp.RequestExecutor.js", "/_layouts/15/sp.RequestExecutor.js");
    }
    angular.module("sfSpUtils").service("spPpJsdepLoader", ["$document",spPpJsdepLoader]);
}(angular));