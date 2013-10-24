/// <reference path="tsUnit.ts" />
/// <reference path="../calculator.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tests = (function (_super) {
    __extends(Tests, _super);
    function Tests() {
        _super.apply(this, arguments);
    }
    Tests.prototype.evaluateVal = function () {
        var five = new Val(5);

        this.areIdentical(5, five.evaluate());
    };

    Tests.prototype.displayVal = function () {
        var five = new Val(5);

        this.areIdentical("5", five.display());
    };

    Tests.prototype.evaluateNegativeVal = function () {
        var negFive = new Val(-5);

        this.areIdentical(-5, negFive.evaluate());
    };

    Tests.prototype.displayNegativeVal = function () {
        var negFive = new Val(-5);

        this.areIdentical("(-5)", negFive.display());
    };

    Tests.prototype.evaluateAddOp = function () {
        var addOp = new AddOp(new Val(1), new Val(2));

        this.areIdentical(3, addOp.evaluate());
    };

    Tests.prototype.displayAddOp = function () {
        var addOp = new AddOp(new Val(1), new Val(2));

        this.areIdentical("1+2", addOp.display());
    };

    Tests.prototype.evaluateSubOp = function () {
        var subOp = new SubOp(new Val(12), new Val(2));

        this.areIdentical(10, subOp.evaluate());
    };

    Tests.prototype.displaySubOp = function () {
        var subOp = new SubOp(new Val(12), new Val(2));

        this.areIdentical("12-2", subOp.display());
    };

    Tests.prototype.evaluateAddOpAndSubOp = function () {
        var combined = new SubOp(new Val(8), new AddOp(new Val(2), new Val(1)));

        this.areIdentical(5, combined.evaluate());
    };

    Tests.prototype.displayAddOpAndSubOp = function () {
        var combined = new SubOp(new Val(8), new AddOp(new Val(2), new Val(1)));

        this.areIdentical("8-(2+1)", combined.display());
    };
    return Tests;
})(tsUnit.TestClass);

// new instance of tsUnit
var test = new tsUnit.Test();

// add your test class (you can call this multiple times)
test.addTestClass(new Tests());

// Use the built in results display
test.showResults(document.body, test.run());
//# sourceMappingURL=tests.js.map
