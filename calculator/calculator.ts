/// <reference path="angular.d.ts" />
/// <reference path="underscore.d.ts" />

"use strict";

interface Expr {
	display(): string;
	evaluate(): number;
}

class Val {
	constructor(public value : number) {
	}

	display() {
		return this.value >= 0 ? this.value.toString() : "(" + this.value.toString() + ")";
	}

	evaluate() {
		return this.value;
	}
}


var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
	$scope.keypad = _.range(10);
});