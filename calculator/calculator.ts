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

class BinaryOp {
	constructor(private left : Expr, private right: Expr, private symbol : string, private evaluator : (x: number, y: number) => number) {
	}

	display() {
		return this.left.display() + this.symbol + this.right.display();
	}

	evaluate() {
		return this.evaluator(this.left.evaluate(), this.right.evaluate());
	}
}

class AddOp extends BinaryOp {
	constructor(left, right) {
		super(left, right, "+", function (a, b) {
			return a + b;
		});
	}
}
class SubOp extends BinaryOp {
	constructor(left, right) {
		super(left, right, "-", function (a, b) {
			return a - b;
		});
	}
}


var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
		$scope.keypad = _.range(10);
	}
);
