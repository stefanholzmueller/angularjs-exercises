/// <reference path="angular.d.ts" />
/// <reference path="underscore.d.ts" />

"use strict";

var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
	$scope.keypad = _.range(10);
});