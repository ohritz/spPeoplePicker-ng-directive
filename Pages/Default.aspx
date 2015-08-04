<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>


<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <meta name="WebPartPageExpansion" content="full" />

    <!-- CSS styles -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link href="../Content/css/bootstrap.css" rel="stylesheet" />
    <link href="../Content/css/bootstrap-custom.css" rel="stylesheet" />
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    People Picker directive demo
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div data-ng-app="app">
        <div data-ng-controller="peoplePickerDemo as vm">
            <div class="row">
                <div class="col-md-6">
                    <!-- people picker -->
                    <sp-people-picker data-ng-model="vm.people1" css-width="280px" allow-multi="true"></sp-people-picker>
                </div>
                <div class="col-md-3">
                    <button data-ng-click="vm.addPerson()" type="button">+</button>
                    <button data-ng-click="vm.remove()" type="button">-</button>
                    <%--<div class="form-group" data-ng-repeat="person in vm.people1">
                        <div class="input-group">
                            <div class="input-group-addon">
                                <label>Test key {{$index}}</label>
                            </div>
                            <div>
                                <input class="form-control" type="text" data-ng-model="person.Key" />
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="input-group-addon">
                                <label>Test displayText {{$index}}</label>
                            </div>
                            <div>
                                <input class="form-control" type="text" data-ng-model="person.DisplayText" />
                            </div>
                        </div>
                    </div>--%>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="well">
                        {{vm.people1}}
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- other vendor libraries -->
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script src="../Scripts/respond.min.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
    <script src="../Scripts/bootstrap-custom.js"></script>
    <script src="../Scripts/modernizr.2.6.2.custom.min.js"></script>
    
    
    <!-- these js files will eventualy be loaded by a service when the directive is used -->
    <script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
    <script type="text/javascript" src="/_layouts/15/clientforms.js"></script>
    <script type="text/javascript" src="/_layouts/15/clientpeoplepicker.js"></script>
    <script type="text/javascript" src="/_layouts/15/autofill.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.core.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.RequestExecutor.js"></script>

    <!-- angularJS library -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular.min.js"></script>

    <!-- js for initilizing the angular app -->
    <script src="../app/app.js"></script>
    <!-- the code for the directive -->
    <script src="../app/sfSpUtils/sfSpUtils.module.js"></script>
    <script src="../app/sfSpUtils/spPeoplePicker.directive.js"></script>

</asp:Content>
