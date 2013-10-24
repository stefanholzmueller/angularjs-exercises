/// <reference path="angular.d.ts" />
/// <reference path="underscore.d.ts" />
"use strict";
var Val = (function () {
    function Val(value) {
        this.value = value;
    }
    Val.prototype.display = function () {
        return this.value >= 0 ? this.value.toString() : "(" + this.value.toString() + ")";
    };

    Val.prototype.evaluate = function () {
        return this.value;
    };
    return Val;
})();

var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
    $scope.keypad = _.range(10);
});
//# sourceMappingURL=calculator.js.map
