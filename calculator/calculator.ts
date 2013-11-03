/// <reference path="lib/angular.d.ts" />
/// <reference path="lib/underscore.d.ts" />

var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
	$scope.keypad = _.range(10);
});