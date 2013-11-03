/// <reference path="lib/angular.d.ts" />
/// <reference path="lib/underscore.d.ts" />

class Input {
	constructor(public label : string) {
	}
}

class Op extends Input {

}

class Num extends Input {
	constructor(public value : number) {
		super(value.toString())
	}
}

var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
	$scope.formula = [];
	$scope.result = "";
	$scope.grid = [
		[ new Num(7), new Num(8), new Num(9), new Op(":") ],
		[ new Num(4), new Num(5), new Num(6), new Op("*") ],
		[ new Num(1), new Num(2), new Num(3), new Op("-") ],
		[ new Num(0), new Input("."), new Input("="), new Op("+") ]
	];
});
