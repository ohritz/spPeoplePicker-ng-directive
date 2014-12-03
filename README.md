spPeoplePicker-ng-directive
===========================

Wrapping the sharepoint client people picker in a angularJs directive.

The Sharepoint client side people picker is a Microsoft construct using html and javascript. 
The way it is enclosed and generated does not allow for simple implementation into a angular controller,
meaning you cant just put a ng-model directive on it and get a value into your model, this also makes it 
not so intuitive to get some sort of validation out of it.

The directive demo'ed in this solution wraps the people picker and allows us to use it in a angular form and 
everything hooks up, validation and ng-model.

The implementation probably still needs work to handle all more situations. 
More specifically error handling could be cleaned up!
