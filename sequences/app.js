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
		x : function() {
			return function(x) {
				return x;
			};
		},
		x2 : function() {
			return function(x) {
				return x * x;
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
