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
    Tests.prototype.testVal = function () {
        var five = new Val(5);

        this.areIdentical("5", five.display());
    };

    Tests.prototype.testNegativeVal = function () {
        var negFive = new Val(-5);

        this.areIdentical("(-5)", negFive.display());
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
