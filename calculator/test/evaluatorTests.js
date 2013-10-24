/// <reference path="tsUnit.ts" />
/// <reference path="../evaluator.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EvaluatorTests = (function (_super) {
    __extends(EvaluatorTests, _super);
    function EvaluatorTests() {
        _super.apply(this, arguments);
    }
    EvaluatorTests.prototype.evaluateVal = function () {
        var five = new Val(5);

        this.areIdentical(5, five.evaluate());
    };

    EvaluatorTests.prototype.displayVal = function () {
        var five = new Val(5);

        this.areIdentical("5", five.display());
    };

    EvaluatorTests.prototype.evaluateNegativeVal = function () {
        var negFive = new Val(-5);

        this.areIdentical(-5, negFive.evaluate());
    };

    EvaluatorTests.prototype.displayNegativeVal = function () {
        var negFive = new Val(-5);

        this.areIdentical("(-5)", negFive.display());
    };

    EvaluatorTests.prototype.evaluateAddOp = function () {
        var addOp = new AddOp(new Val(1), new Val(2));

        this.areIdentical(3, addOp.evaluate());
    };

    EvaluatorTests.prototype.displayAddOp = function () {
        var addOp = new AddOp(new Val(1), new Val(2));

        this.areIdentical("1+2", addOp.display());
    };

    EvaluatorTests.prototype.evaluateSubOp = function () {
        var subOp = new SubOp(new Val(12), new Val(2));

        this.areIdentical(10, subOp.evaluate());
    };

    EvaluatorTests.prototype.displaySubOp = function () {
        var subOp = new SubOp(new Val(12), new Val(2));

        this.areIdentical("12-2", subOp.display());
    };

    EvaluatorTests.prototype.evaluateAddOpAndSubOp = function () {
        var combined = new SubOp(new Val(8), new AddOp(new Val(2), new Val(1)));

        this.areIdentical(5, combined.evaluate());
    };

    EvaluatorTests.prototype.displayAddOpAndSubOp = function () {
        var combined = new SubOp(new Val(8), new AddOp(new Val(2), new Val(1)));

        this.areIdentical("8-(2+1)", combined.display());
    };

    EvaluatorTests.prototype.evaluateAddOpAndMulOp = function () {
        var combined = new MulOp(new Val(4), new AddOp(new Val(2), new Val(1)));

        this.areIdentical(12, combined.evaluate());
    };

    EvaluatorTests.prototype.displayAddOpAndMulOp = function () {
        var combined = new AddOp(new Val(4), new MulOp(new Val(2), new Val(3)));

        this.areIdentical("4+2*3", combined.display());
    };
    return EvaluatorTests;
})(tsUnit.TestClass);

// new instance of tsUnit
var test = new tsUnit.Test();

// add your test class (you can call this multiple times)
test.addTestClass(new EvaluatorTests());

// Use the built in results display
test.showResults(document.body, test.run());
//# sourceMappingURL=evaluatorTests.js.map
