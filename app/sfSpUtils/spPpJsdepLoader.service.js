(function (angular) {
    'use strict';
    function spPpJsdepLoader($document, $q) {
        // todo, implement a checking and loading of needed script files for Share Point People Picker
        // using Share Point SOD.
        // need to find a way to check if a library is loaded, what object are each exposing?
        // if not loaded, run a SOD execute?

        var scriptLoader = $q.defer();

        if (!SP.SOD.registerSod) {            
            var initTag = document.createElement("script");
            initTag.src = "/_layouts/15/init.js";
            var head = document.getElementsByTagName("head");
            head.append(initTag);
        }
        SP.SOD.registerSod("sp.js", "/_layouts/15/sp.js");
        SP.SOD.registerSod("sp.runtime.js", "/_layouts/15/sp.runtime.js");
        
        SP.SOD.registerSod("clienttemplates.js", "/_layouts/15/clienttemplates.js");
        SP.SOD.registerSod("clientforms.js", "/_layouts/15/clientforms.js");        
        SP.SOD.registerSod("autofill.js", "/_layouts/15/autofill.js");
        SP.SOD.registerSod("sp.core.js", "/_layouts/15/sp.core.js");
        SP.SOD.registerSod("sp.RequestExecutor.js", "/_layouts/15/sp.RequestExecutor.js");
        SP.SOD.registerSod("clientpeoplepicker.js", "/_layouts/15/clientpeoplepicker.js");

        SP.SOD.registerSodDep("sp.RequestExecutor.js", "sp.core.js");
        SP.SOD.registerSodDep("sp.core.js", "sp.js");
        SP.SOD.registerSodDep("sp.core.js", "sp.runtime.js");

        SP.SOD.registerSodDep("clientpeoplepicker.js", "clienttemplates.js");
        SP.SOD.registerSodDep("clientpeoplepicker.js", "clientforms.js");
        SP.SOD.registerSodDep("clientpeoplepicker.js", "autofill.js");
        SP.SOD.registerSodDep("clientpeoplepicker.js", "sp.core.js");
        SP.SOD.registerSodDep("clientpeoplepicker.js", "sp.RequestExecutor.js");

        SP.SOD.executeFunc("clientpeoplepicker.js", "SPClientPeoplePicker", function () {
            console.log("loaded");
            scriptLoader.resolve();
        });

        
        
        
         this.scriptsLoaded = scriptLoader.promise
        
    }
    angular.module("spUtils").service("spPpJsdepLoader", ["$document", "$q", spPpJsdepLoader]);
}(angular = angular || window.angular));