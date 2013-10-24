/// <reference path="tsUnit.ts" />
/// <reference path="../evaluator.ts" />

class EvaluatorTests extends tsUnit.TestClass {

	evaluateVal() {
		var five = new Val(5);

		this.areIdentical(5, five.evaluate());
	}

	displayVal() {
		var five = new Val(5);

		this.areIdentical("5", five.display());
	}

	evaluateNegativeVal() {
		var negFive = new Val(-5);

		this.areIdentical(-5, negFive.evaluate());
	}

	displayNegativeVal() {
		var negFive = new Val(-5);

		this.areIdentical("(-5)", negFive.display());
	}

	evaluateAddOp() {
		var addOp = new AddOp(new Val(1), new Val(2));

		this.areIdentical(3, addOp.evaluate());
	}

	displayAddOp() {
		var addOp = new AddOp(new Val(1), new Val(2));

		this.areIdentical("(1+2)", addOp.display());
	}

	evaluateSubOp() {
		var subOp = new SubOp(new Val(12), new Val(2));

		this.areIdentical(10, subOp.evaluate());
	}

	displaySubOp() {
		var subOp = new SubOp(new Val(12), new Val(2));

		this.areIdentical("(12-2)", subOp.display());
	}

	evaluateAddOpAndSubOp() {
		var combined = new SubOp(new Val(8), new AddOp(new Val(2), new Val(1)));

		this.areIdentical(5, combined.evaluate());
	}

	displayAddOpAndSubOp() {
		var combined = new SubOp(new Val(8), new AddOp(new Val(2), new Val(1)));

		this.areIdentical("(8-(2+1))", combined.display());
	}
}

// new instance of tsUnit
var test = new tsUnit.Test();

// add your test class (you can call this multiple times)
test.addTestClass(new EvaluatorTests());

// Use the built in results display
test.showResults(document.body, test.run());