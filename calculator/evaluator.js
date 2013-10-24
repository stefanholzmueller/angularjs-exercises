/// <reference path="underscore.d.ts" />
"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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

var BinaryOp = (function () {
    function BinaryOp(left, right, symbol, evaluator) {
        this.left = left;
        this.right = right;
        this.symbol = symbol;
        this.evaluator = evaluator;
    }
    BinaryOp.prototype.display = function () {
        return this.left.display() + this.symbol + this.right.display();
    };

    BinaryOp.prototype.evaluate = function () {
        return this.evaluator(this.left.evaluate(), this.right.evaluate());
    };
    return BinaryOp;
})();

var AddOp = (function (_super) {
    __extends(AddOp, _super);
    function AddOp(left, right) {
        _super.call(this, left, right, "+", function (a, b) {
            return a + b;
        });
    }
    return AddOp;
})(BinaryOp);
var SubOp = (function (_super) {
    __extends(SubOp, _super);
    function SubOp(left, right) {
        _super.call(this, left, right, "-", function (a, b) {
            return a - b;
        });
    }
    return SubOp;
})(BinaryOp);
//# sourceMappingURL=evaluator.js.map
