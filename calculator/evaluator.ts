/// <reference path="underscore.d.ts" />

"use strict";

interface Expr {
	display(): string;
	evaluate(): number;
}

class Val {
	constructor(private value : number) {
	}

	display() {
		return this.value >= 0 ? this.value.toString() : "(" + this.value.toString() + ")";
	}

	evaluate() {
		return this.value;
	}
}

class BinaryOp {
	constructor(private left : Expr, private right : Expr, private symbol : string, private evaluator : (l : number, r : number) => number) {
	}

	display() {
		return "(" + this.left.display() + this.symbol + this.right.display() + ")";
	}

	evaluate() {
		return this.evaluator(this.left.evaluate(), this.right.evaluate());
	}
}

class AddOp extends BinaryOp {
	constructor(left, right) {
		super(left, right, "+", function (l, r) {
			return l + r;
		});
	}
}
class SubOp extends BinaryOp {
	constructor(left, right) {
		super(left, right, "-", function (l, r) {
			return l - r;
		});
	}
}
