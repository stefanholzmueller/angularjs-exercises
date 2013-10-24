/// <reference path="tsUnit.ts" />
/// <reference path="../calculator.ts" />

class Tests extends tsUnit.TestClass {

	testVal() {
		var five = new Val(5);

		this.areIdentical("5", five.display());
	}

	testNegativeVal() {
		var negFive = new Val(-5);

		this.areIdentical("(-5)", negFive.display());
	}

}

// new instance of tsUnit
var test = new tsUnit.Test();

// add your test class (you can call this multiple times)
test.addTestClass(new Tests());

// Use the built in results display
test.showResults(document.body, test.run());