/// <reference path="lib/angular.d.ts" />
/// <reference path="lib/underscore.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Special = (function () {
    function Special(label) {
        this.label = label;
    }
    Special.prototype.display = function () {
        return this.label;
    };

    Special.prototype.evaluate = function (l, r) {
        throw new Error("evaluate on Special");
    };

    Special.prototype.hasPrecedence = function (p) {
        throw new Error("hasPrecedence on Special");
    };
    return Special;
})();

var Num = (function () {
    function Num(value) {
        this.value = value;
    }
    Num.prototype.display = function () {
        return this.value.toString();
    };

    Num.prototype.evaluate = function (l, r) {
        return this.value;
    };

    Num.prototype.hasPrecedence = function (p) {
        return false;
    };
    return Num;
})();

var BinaryOp = (function () {
    function BinaryOp(label, precedence, evaluator) {
        this.label = label;
        this.precedence = precedence;
        this.evaluator = evaluator;
    }
    BinaryOp.prototype.display = function () {
        return this.label;
    };

    BinaryOp.prototype.evaluate = function (left, right) {
        return this.evaluator(left, right);
    };

    BinaryOp.prototype.hasPrecedence = function (p) {
        return this.precedence === p;
    };
    return BinaryOp;
})();

var AddOp = (function (_super) {
    __extends(AddOp, _super);
    function AddOp() {
        _super.call(this, "+", 2, function (l, r) {
            return l + r;
        });
    }
    return AddOp;
})(BinaryOp);

var SubOp = (function (_super) {
    __extends(SubOp, _super);
    function SubOp() {
        _super.call(this, "-", 2, function (l, r) {
            return l - r;
        });
    }
    return SubOp;
})(BinaryOp);

var MulOp = (function (_super) {
    __extends(MulOp, _super);
    function MulOp() {
        _super.call(this, "*", 3, function (l, r) {
            return l * r;
        });
    }
    return MulOp;
})(BinaryOp);

var DivOp = (function (_super) {
    __extends(DivOp, _super);
    function DivOp() {
        _super.call(this, "/", 3, function (l, r) {
            return l / r;
        });
    }
    return DivOp;
})(BinaryOp);

var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
    $scope.formula = new Array();
    $scope.result = [new Num(0)];
    $scope.grid = [
        [new Num(7), new Num(8), new Num(9), new DivOp()],
        [new Num(4), new Num(5), new Num(6), new MulOp()],
        [new Num(1), new Num(2), new Num(3), new SubOp()],
        [new Num(0), new Special("."), new Special("="), new AddOp()]
    ];

    function isNum(x) {
        return x !== undefined && x.value !== undefined;
    }

    function addToFormula(k) {
        var last = _.last($scope.formula);
        if (isNum(k)) {
            if (isNum(last)) {
                var kValue = k.value;
                $scope.formula.pop();
                $scope.formula.push(new Num(last.value * 10 + kValue));
            } else {
                $scope.formula.push(k);
            }
        } else {
            if (isNum(last)) {
                $scope.formula.push(k);
            } else if (last !== undefined) {
                $scope.formula.pop();
                $scope.formula.push(k);
            }
        }
    }

    function evaluateWithPrecedence(formula, precedence) {
        var opIndex = _.findIndex(formula, function (x) {
            return x.hasPrecedence(precedence);
        });
        while (opIndex !== -1) {
            var left = formula[opIndex - 1];
            var op = formula[opIndex];
            var right = formula[opIndex + 1];
            var binaryOp = op;
            var result = binaryOp.evaluate(left.evaluate(0, 0), right.evaluate(0, 0));
            formula.splice(opIndex - 1, 3, new Num(result));

            opIndex = _.findIndex(formula, function (x) {
                return x.hasPrecedence(precedence);
            });
        }
        return formula;
    }

    function evaluate() {
        var formula = _.clone($scope.formula);
        return evaluateWithPrecedence(evaluateWithPrecedence(formula, 3), 2);
    }

    $scope.press = function (key) {
        if (key.display() === "=") {
            $scope.result = evaluate();
        } else if (key.display() === ".") {
            // TODO decimal point
        } else {
            addToFormula(key);
        }
    };
    $scope.$on("keypress", function (keyCode) {
        var pressedKey = String.fromCharCode(keyCode);
        _.each($scope.grid, function (row) {
            return _.each(row, function (key) {
                if (key.display() === pressedKey) {
                    $scope.press(key);
                }
            });
        });
    });
});

app.directive('keypressEvents', [
    '$document',
    '$rootScope',
    function ($document, $rootScope) {
        return {
            restrict: 'A',
            link: function () {
                $document.bind('keypress', function (e) {
                    console.log('Got keypress:', e.which);
                    $rootScope.$broadcast('keypress', e.which);
                });
            }
        };
    }
]);

app.filter('displayFormula', function () {
    return function (input) {
        return _.map(input, function (x) {
            return x.display();
        }).join("");
    };
});
//# sourceMappingURL=calculator.js.map
