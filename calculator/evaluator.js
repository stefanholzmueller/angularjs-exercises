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
        var str = this.value.toString();
        return this.value >= 0 ? str : "(" + str + ")";
    };

    Val.prototype.evaluate = function () {
        return this.value;
    };
    return Val;
})();

var BinaryOp = (function () {
    function BinaryOp(left, right, symbol, precedence, evaluator) {
        this.left = left;
        this.right = right;
        this.symbol = symbol;
        this.precedence = precedence;
        this.evaluator = evaluator;
    }
    BinaryOp.prototype.display = function (p) {
        if (typeof p === "undefined") { p = 0; }
        var inner = this.left.display(this.precedence) + this.symbol + this.right.display(this.precedence);
        return this.precedence > p ? inner : "(" + inner + ")";
    };

    BinaryOp.prototype.evaluate = function () {
        return this.evaluator(this.left.evaluate(), this.right.evaluate());
    };
    return BinaryOp;
})();

var AddOp = (function (_super) {
    __extends(AddOp, _super);
    function AddOp(left, right) {
        _super.call(this, left, right, "+", 2, function (l, r) {
            return l + r;
        });
    }
    return AddOp;
})(BinaryOp);

var SubOp = (function (_super) {
    __extends(SubOp, _super);
    function SubOp(left, right) {
        _super.call(this, left, right, "-", 2, function (l, r) {
            return l - r;
        });
    }
    return SubOp;
})(BinaryOp);

var MulOp = (function (_super) {
    __extends(MulOp, _super);
    function MulOp(left, right) {
        _super.call(this, left, right, "*", 3, function (l, r) {
            return l * r;
        });
    }
    return MulOp;
})(BinaryOp);
//# sourceMappingURL=evaluator.js.map
