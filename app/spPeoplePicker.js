(function() {
    var directiveId = 'spPeoplePicker';
    angular.module('app').directive(directiveId, [spPeoplePicker]);

    function spPeoplePicker() {

        var uniqueNr = 1;

        function linkIt(scope, element, attrs, ngModelCtrl) {
            //vi create a unique Id for the container.
            var uniqueId = '_' + uniqueNr++;

            var peoplePicker;

            //the Id for the Div that will be used to create the picker
            var pickerOuterId = 'peoplePickerDiv' + uniqueId;
            //the Id fo the div where we can find the picker
            var pickerDivId = pickerOuterId + '_TopSpan';

            // we look up the container div and label in our template 
            // and set the attributes 'Id' and 'for' to the Id respectivly 
            // based on the unique Id
            element.find('label').attr('for', pickerDivId);
            element.find('#peoplePickerDivX').attr('id', pickerOuterId);

            // we define a schema object for initilizing the picker.
            // some of the values we get from the attributes on the directive.
            // if they are not set, we set standard values
            var schema = {};
            schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
            schema['SearchPrincipalSource'] = 15;
            schema['ResolvePrincipalSource'] = 15;
            schema['AllowMultipleValues'] = (scope.allowMulti) ? scope.allowMulti : true;
            schema['MaximumEntitySuggestions'] = 50;
            schema['Width'] = (scope.cssWidth) ? scope.cssWidth : '220px';

            // on the schema we set a function to raise when a new user is resolved.
            // in the function vi get the users, and update the view value on the model controller.
            schema['OnUserResolvedClientScript'] = function() {
                if (peoplePicker) {
                    if (!scope.getAllInfo) {
                        //var keys = peoplePicker.GetAllUserKeys().split(';');
                        ngModelCtrl.$setViewValue(peoplePicker.GetAllUserKeys());
                    } else {
                        ngModelCtrl.$setViewValue(peoplePicker.GetAllUserInfo());
                    }
                }
            };

            // Render and initialize the picker. 
            // Pass the ID of the DOM element that contains the picker, an array of initial
            // PickerEntity objects to set the picker value, and a schema that defines
            // picker properties.
            SPClientPeoplePicker_InitStandaloneControlWrapper(pickerOuterId, null, schema);

            element.find('#' + pickerDivId).addClass('form-control');

            // Get the people picker object from the page.
            peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDivId];
            

            ngModelCtrl.$formatters.push(function(modelValue) {
                var res;

                if (modelValue && modelValue != ngModelCtrl.$viewValue) {
                    if (modelValue.constructor === Array) {
                        if (scope.getAllInfo) {
                            modelValue.forEach(function (item) {
                                (res) ? res += ';' + item.Key : res = item.Key;
                            });
                        } else {
                            res = modelValue.join(';');
                        }
                        
                    }
                    return res;
                }
                return modelValue;
            });
            ngModelCtrl.$render = function() {
                if (peoplePicker) {
                    if (ngModelCtrl.$viewValue) {
                            var toAdd = ngModelCtrl.$viewValue;
                            if (peoplePicker.TotalUserCount > 0) {
                                for (var SPClientPeoplePickerProcessedUser in peoplePicker.ProcessedUserList) {
                                    var prUser = peoplePicker.ProcessedUserList[SPClientPeoplePickerProcessedUser];
                                    if (prUser) {
                                        var userKey = prUser.UserInfo.Key + ';';
                                        if (toAdd.search(userKey) != -1) {
                                            toAdd = toAdd.replace(userKey,"");
                                        }
                                    }
                                    
                                }
                            }
                            peoplePicker.AddUserKeys(toAdd);
                        
                        peoplePicker.UpdateUnresolvedUser();
                        peoplePicker.Validate();
                    }
                }
            };
            ngModelCtrl.$parsers.push(function(viewValue) {
                if (viewValue) {
                    if(!scope.getAllInfo){
                    var keys = viewValue.split(';');
                    return keys;
                    }
                }
                return viewValue;

            });

        }

        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            link: linkIt,
            scope: {
                allowMulti: '=',
                label: '@',
                cssWidth: '@',
                getAllInfo: '='

            },
            template: '<div class="form-group"> <div class="input-group">' +
                '<div class="input-group-addon"><label for="peoplePickerDivX">{{label}}</label></div>' +
                '<div id="peoplePickerDivX"></div>' +
                '</div></div>'
        };
    }
})();