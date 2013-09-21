var module = angular.module('sequences', []);

// config start
module.value('numberOfPuzzles', 10);
module.value('numberOfGivenElements', 5);
// config end

module.controller('SequencesController', [ '$scope', 'numberOfPuzzles', 'numberOfGivenElements', 'SequencesFactory', function($scope, numberOfPuzzles, numberOfGivenElements, factory) {
	$scope.guesses = new Array(numberOfPuzzles);
	$scope.puzzles = _.range(numberOfPuzzles);
	$scope.given = _.range(numberOfGivenElements);

	$scope.sequences = _.range(numberOfPuzzles).map(function(p) {
		return _.sample(_.values(factory))();
	});

	$scope.check = function(i) {
		return $scope.guesses[i] == $scope.sequences[i](numberOfGivenElements);
	};
} ]);

module.factory('SequencesFactory', [ 'RandomService', function(random) {
	return {
		lin : function() {
			var a = _.random(1, 6);
			var b = _.random(-10);
			return function(x) {
				return a * x + b;
			};
		},
		exp : function() {
			var exp = _.random(1, 3);
			var offset = _.random(0, 1);
			return function(x) {
				return Math.pow(x + offset, exp);
			};
		},
		fib : function() {
			function fibonacci(n) {
				return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
			}
			var offset = _.random(1, 5);
			return function(x) {
				return fibonacci(x + offset);
			};
		}
	};
} ]);

module.factory('RandomService', [ function() {
	return {
		pos : function(max) {
			return range(1, max);
		},
		neg : function(min) {
			return range(min, -1);
		},
		range : function(min, max) {
			return Math.floor((Math.random() * (max - min + 1)) + min);
		},
	};
} ]);
