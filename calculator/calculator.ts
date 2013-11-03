/// <reference path="lib/angular.d.ts" />
/// <reference path="lib/underscore.d.ts" />

interface Input {
	display()
}

class Special implements Input {
	constructor(private label : string) {
	}

	display() {
		return this.label;
	}
}

class Num implements Input {
	constructor(public value : number) {
	}

	display() {
		return this.value.toString();
	}
}

class BinaryOp implements Input {
	constructor(private label : string, public precedence : number, public fn) {
	}

	display() {
		return this.label;
	}
}

class AddOp extends BinaryOp {
	constructor() {
		super("+", 2, function (l, r) {
			return l + r;
		});
	}
}

class SubOp extends BinaryOp {
	constructor() {
		super("-", 2, function (l, r) {
			return l - r;
		});
	}
}

class MulOp extends BinaryOp {
	constructor() {
		super("*", 3, function (l, r) {
			return l * r;
		});
	}
}

class DivOp extends BinaryOp { // TODO handle div by zero
	constructor() {
		super("/", 3, function (l, r) {
			return l / r;
		});
	}
}

function evaluate(formula) {
	return 123;
}

var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
	$scope.formula = [];
	$scope.result = "0";
	$scope.grid = [
		[ new Num(7), new Num(8), new Num(9), new DivOp() ],
		[ new Num(4), new Num(5), new Num(6), new MulOp() ],
		[ new Num(1), new Num(2), new Num(3), new SubOp() ],
		[ new Num(0), new Special("."), new Special("="), new AddOp() ]
	];

	function isNum(x) {
		return x !== undefined && x.value !== undefined;
	}

	function addToFormula(k) {
		var last : Num = _.last($scope.formula);
		if (isNum(k)) { // Num
			if (isNum(last)) {
				var kValue : number = k.value;
				$scope.formula.pop(); // replace num
				$scope.formula.push(new Num(last.value * 10 + kValue));
			} else {
				$scope.formula.push(k); // add num
			}
		} else { // BinaryOp
			if (isNum(last)) {
				$scope.formula.push(k); // add op
			} else {
				$scope.formula.pop(); // replace op
				$scope.formula.push(k);
			}
		}
	}

	$scope.press = function (key) {
		if (key.display() === "=") {
			$scope.result = evaluate($scope.formula)
		} else if (key.display() === ".") {
			// TODO decimal point
		} else {
			addToFormula(key);
		}
	};
	$scope.$on("keypress", function (keyCode) {
		var pressedKey = String.fromCharCode(keyCode); // TODO arg is undefined
		_.each($scope.grid, (row) => _.each(row, (key) => {
			if (key.display() === pressedKey) {
				$scope.press(key);
			}
		}));
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