/// <reference path="lib/angular.d.ts" />
/// <reference path="lib/underscore.d.ts" />

interface Input {
	display();
	evaluate(l, r): number;
	hasPrecedence(p : number);
}

class Special implements Input {
	constructor(private label : string) {
	}

	display() : string {
		return this.label;
	}

	evaluate(l, r) : number {
		throw new Error("evaluate on Special");
	}

	hasPrecedence(p) : boolean {
		throw new Error("hasPrecedence on Special");
	}
}

class Num implements Input {
	constructor(public value : number) {
	}

	display() : string {
		return this.value.toString();
	}

	evaluate(l, r) : number {
		return this.value;
	}

	hasPrecedence(p) : boolean {
		return false;
	}
}

class BinaryOp implements Input {
	constructor(private label : string, private precedence : number, private evaluator) {
	}

	display() : string {
		return this.label;
	}

	evaluate(left, right) : number {
		return this.evaluator(left, right);
	}

	hasPrecedence(p) : boolean {
		return this.precedence === p;
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


var app = angular.module("calculator", []);

app.controller("CalculatorController", function ($scope) {
	$scope.formula = new Array<Input>();
	$scope.result = [new Num(0)];
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
			} else if (last !== undefined) {
				$scope.formula.pop(); // replace op
				$scope.formula.push(k);
			}
		}
	}

	function evaluateWithPrecedence(formula : Array<Input>, precedence : number) : Array<Input> {
		var opIndex = _.findIndex(formula, (x) => x.hasPrecedence(precedence));
		while (opIndex !== -1) {
			var left = formula[opIndex - 1];
			var op = formula[opIndex];
			var right = formula[opIndex + 1 ];
			var binaryOp = <BinaryOp> op;
			var result = binaryOp.evaluate(left.evaluate(0, 0), right.evaluate(0, 0));
			formula.splice(opIndex - 1, 3, new Num(result));

			opIndex = _.findIndex(formula, (x) => x.hasPrecedence(precedence))
		}
		return formula;
	}

	function evaluate() {
		var formula : Array<Input> = _.clone($scope.formula);
		return evaluateWithPrecedence(evaluateWithPrecedence(formula, 3), 2);
	}

	$scope.press = function (key) {
		if (key.display() === "=") { // TODO sanity check
			$scope.result = evaluate()
		} else if (key.display() === ".") {
			// TODO decimal point
		} else {
			addToFormula(key);
		}
	};
	$scope.$on("keypress", function (e, keyCode) {
		if (keyCode === 13) {
			$scope.press(new Special("="));
		} else {
			var pressedKey = String.fromCharCode(keyCode);
			_.each($scope.grid, (row) => _.each(row, (key) => {
				if (key.display() === pressedKey) {
					$scope.press(key);
				}
			}));
		}
	});
});

app.directive('keypressEvents', [
	function () {
		return {
			restrict: 'A',
			link: function ($scope, $element) {
				$element.bind('keypress', function (e) {
					$scope.$apply(function () {
						$scope.$emit('keypress', e.which);
					})
				});
			}
		};
	}
]);

app.filter('displayFormula', function () {
	return function (input : Array<Input>) {
		return _.map(input,(x) => x.display()).join("");
	}
});
