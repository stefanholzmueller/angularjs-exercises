/// <reference path="lib/angular.d.ts" />
/// <reference path="lib/underscore.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Input = (function () {
    function Input(label) {
        this.label = label;
    }
    return Input;
})();

var Op = (function (_super) {
    __extends(Op, _super);
    function Op() {
        _super.apply(this, arguments);
    }
    return Op;
})(Input);

var Num = (function (_super) {
    __extends(Num, _super);
    function Num(value) {
        _super.call(this, value.toString());
        this.value = value;
    }
    return Num;
})(Input);

var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
    $scope.formula = [];
    $scope.result = "";
    $scope.grid = [
        [new Num(7), new Num(8), new Num(9), new Op(":")],
        [new Num(4), new Num(5), new Num(6), new Op("*")],
        [new Num(1), new Num(2), new Num(3), new Op("-")],
        [new Num(0), new Input("."), new Input("="), new Op("+")]
    ];
});
//# sourceMappingURL=calculator.js.map
