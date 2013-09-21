var module = angular.module('sequences', []);

// config start
module.value('numberOfPuzzles', 10);
module.value('numberOfGivenElements', 5);
// config end

module.controller('SequencesController', [ '$scope', 'numberOfPuzzles', 'numberOfGivenElements', 'SequencesFactory', function($scope, numberOfPuzzles, numberOfGivenElements, factory) {
	$scope.guesses = new Array(numberOfPuzzles);
	$scope.puzzles = _.range(numberOfPuzzles);
	$scope.given = _.range(numberOfGivenElements);

	$scope.sequences = factory.batch(numberOfPuzzles);

	$scope.check = function(i) {
		return $scope.guesses[i] == $scope.sequences[i](numberOfGivenElements);
	};
} ]);

module.factory('SequencesFactory', [ 'RandomService', function(random) {
	return {
		x : function(x) {
			return x;
		},
		x2 : function(x) {
			return x * x;
		},
		batch : function(i) {
			var array = [ this.x, this.x2 ];
			return _.range(i).map(function(_) {
				return array[Math.floor(Math.random() * array.length)];
			});
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
