/// <reference path="underscore.d.ts" />

"use strict";

interface Expr {
	display(p): string;
	evaluate(): number;
}

class Val implements Expr {
	constructor(private value : number) {
	}

	display() {
		var str = this.value.toString();
		return this.value >= 0 ? str : "(" + str + ")";
	}

	evaluate() {
		return this.value;
	}
}

class BinaryOp implements Expr {
	constructor(private left : Expr, private right : Expr, private symbol : string, private precedence : number, private evaluator : (l : number, r : number) => number) {
	}

	display(p : number = 0) {
		var inner = this.left.display(this.precedence) + this.symbol + this.right.display(this.precedence);
		return this.precedence > p ? inner : "(" + inner + ")";
	}

	evaluate() {
		return this.evaluator(this.left.evaluate(), this.right.evaluate());
	}
}

class AddOp extends BinaryOp {
	constructor(left, right) {
		super(left, right, "+", 2, function (l, r) {
			return l + r;
		});
	}
}

class SubOp extends BinaryOp {
	constructor(left, right) {
		super(left, right, "-", 2, function (l, r) {
			return l - r;
		});
	}
}

class MulOp extends BinaryOp {
	constructor(left, right) {
		super(left, right, "*", 3, function (l, r) {
			return l * r;
		});
	}
}

class DivOp extends BinaryOp { // TODO handle div by zero
	constructor(left, right) {
		super(left, right, "/", 3, function (l, r) {
			return l / r;
		});
	}
}