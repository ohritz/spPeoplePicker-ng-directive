
(function (angular) {
    var directiveId = "spPeoplePicker";

    function spPeoplePicker() {
        var uniqueNr = 1;

        function link(scope, element, attrs, ngModelCtrl) {
            //the Id for the Div that will be used to create the picker
            var pickerOuterId = element[0].children[0].id;
            //the Id fo the div where we can find the picker
            var pickerDivId = pickerOuterId + "_TopSpan";
            var peoplePicker;

            // we define a schema object for initilizing the picker.
            // some of the values we get from the attributes on the directive.
            // if they are not set, we set standard values
            var schema = {};
            //does this need to be able to be set as an attr?
            schema["PrincipalAccountType"] = "User,DL,SecGroup,SPGroup";
            schema["SearchPrincipalSource"] = 15;
            schema["ResolvePrincipalSource"] = 15;
            schema["AllowMultipleValues"] = (attrs.allowMulti) ? attrs.allowMulti : true;
            schema["MaximumEntitySuggestions"] = 25;
            schema["Width"] = (attrs.cssWidth) ? attrs.cssWidth : "220px";

            // on the schema we set a function to raise when a new user is resolved.
            // in the function vi get the users, and update the view value on the model controller.
            schema["OnUserResolvedClientScript"] = function (elementId, values) {
                ngModelCtrl.$setViewValue(values);
            };

            //todo check if this function is more useful, for removing items on the model.
            //schema["OnValueChangedClientScript"] = function (elementId, values) {};

            // Render and initialize the picker. 
            // Pass the ID of the DOM element that contains the picker, an array of initial
            // PickerEntity objects to set the picker value, and a schema that defines
            // picker properties.
            window.SPClientPeoplePicker_InitStandaloneControlWrapper(pickerOuterId, [], schema);
            // Get the people picker object from the page.
            peoplePicker = window.SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDivId];
            //console.log(peoplePicker);

            //ngModelCtrl.$modelValue = ngModelCtrl.$modelValue || [];
            scope.ngModel = ngModelCtrl.$modelValue || [];

            ngModelCtrl.$isEmpty = function (value) {
                //console.log("cheking for empty");
                if (angular.isArray(value) && value.length > 0 && (value.map(function (i) { return i.Key; })).length > 0)
                    return false;
                return true;
            }
            ngModelCtrl.$formatters.push(function (modelValue) {
                console.log("formatters", modelValue);
                //if (angular.isUndefined(modelValue))
                //    modelValue = "";
                //if (angular.isArray(modelValue)) {
                //    return modelValue.map(function (item) {
                //        return item.Key;
                //    }).join(";");
                //}
                return modelValue; //string of keys
            });

            //utility functions
            function DeleteProcessedUser(a) {
                var e = null;
                if (a == null) {
                    var c = document.getElementById(this.ResolvedListElementId);
                    if (c != null)
                        a = c.lastChild
                }
                if (a != null) {
                    var b = a.id;
                    a.parentNode.removeChild(a);
                    var d = this.ProcessedUserList[b];
                    if (d != null && !d.ResolvedUser)
                        this.UnresolvedUserCount--;
                    this.TotalUserCount--;
                    delete this.ProcessedUserList[b];
                    //this.OnControlResolvedUserChanged();
                    //this.OnControlValueChanged()
                }
            }
            function isUserInViewValues(user, view) {
                for (var i = 0, length = view.length; i < length; i++) {
                    console.log(user.Key, view[i].Key)
                    if (user.Key === view[i].Key) {
                        return true;
                    }
                }
                return false;
            }
            Array.prototype.unique = function (fn) {
                return this.reduce(function (accum, current) {
                    if (typeof fn === "function") {
                        if (accum.deepIndexOf(current, fn) < 0)
                            accum.push(current);
                    } else {
                        if (accum.indexOf(current) < 0) {
                            accum.push(current);
                        }
                    }
                    return accum;
                }, []);
            }
            Array.prototype.deepIndexOf = function (searchElement, fn) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var O = Object(this);
                var len = O.length
                var k;
                if (len === 0) {
                    return -1;
                }
                for (k = 0; k < len; k++) {
                    if(fn(searchElement, this[k]))
                        return k;
                }
                return -1;
            };
            ngModelCtrl.$render = function () {
                //console.log("in render ", ngModelCtrl.$viewValue);
                if (peoplePicker) {
                    var view = ngModelCtrl.$viewValue || [];
                    var usersInPicker = [];
                    var toAdd = [];
                    var toFilter = [];
                    if (peoplePicker.TotalUserCount > 0) {
                        usersInPicker = Object.keys(peoplePicker.ProcessedUserList).map(function (id) {
                            var user = peoplePicker.ProcessedUserList[id];
                            return { Key: user.UserInfo.Key, UserContainerElementId: user.UserContainerElementId };
                        });
                        
                        for (var i = 0; i < usersInPicker.length; i++) {
                            if (!isUserInViewValues(usersInPicker[i], view)) {
                                var docNode = document.getElementById(usersInPicker[i].UserContainerElementId);
                                DeleteProcessedUser.apply(peoplePicker, docNode);
                            } else {
                                toFilter.push(usersInPicker[i].Key);
                            }
                        }
                    }
                    toAdd = view.filter(function (item) {
                        return toFilter.indexOf(item.Key) === -1;
                    });

                    peoplePicker.AddUserKeys(toAdd.map(function (item) {
                        return item.Key;
                    }).join(";"));
                    peoplePicker.UpdateUnresolvedUser();
                    peoplePicker.Validate();

                }
            };

            ngModelCtrl.$parsers.push(function (viewValue) {
                console.log("viewValue: ", viewValue);

                if (ngModelCtrl.$isEmpty(viewValue)) {
                    return viewValue;
                }
                return viewValue.map(function (i) {
                    return { Key: i.Key, DisplayText: i.DisplayText };
                });

            });
            function compareArray(a, b) {
                if (a === b)
                    return true;
                if (angular.isArray(a) && angular.isArray(b)) {
                    if (a.length !== b.length)
                        return false;

                    a.sort(function (a, b) { return a.Key - b.Key });
                    b.sort(function (a, b) { return a.Key - b.Key });

                    for (var i = 0, length = a.length; i < length; i++) {
                        if (a[i].Key !== b[i].Key)
                            return false;
                    }
                }
                return true;

            }
            scope.$watch("ngModel", function (val) {
                console.group("watch");
                console.log(val);
                console.log(ngModelCtrl.$modelValue);
                console.log(ngModelCtrl.$viewValue);
                console.groupEnd();
                console.log(compareArray(ngModelCtrl.$modelValue, ngModelCtrl.$viewValue));
                if (!compareArray(ngModelCtrl.$modelValue, ngModelCtrl.$viewValue)) {
                    var unique = val.unique(function (a, b) {
                        return a.Key === b.Key;
                    });
                    ngModelCtrl.$setViewValue(unique);
                }
                ngModelCtrl.$render();
            }, true);


        }

        function template() {
            return "<div id='peoplePickerDiv_" + uniqueNr++ + "'></div>";
        }

        return {
            restrict: "E",
            require: "ngModel",
            link: link,
            scope: {
                //allowMulti: "=",
                //cssWidth: "@",
                ngModel: "="
            },
            template: template
        };
    }

    angular.module("sfSpUtils").directive(directiveId, [spPeoplePicker]);
})(angular = angular || window.angular);

