var module = angular.module('sequences', []);

// config start
module.value('numberOfSequences', 10);
module.value('numberOfGivenElements', 5);
// config end

module.controller('SequencesController', [ '$scope', 'numberOfSequences', 'numberOfGivenElements', function($scope, numberOfSequences, numberOfGivenElements) {
	$scope.guesses = new Array(numberOfSequences);
	$scope.puzzles = _.range(numberOfSequences);
	$scope.given = _.range(numberOfGivenElements);
	
	var basic = function(x) {
		return x;
	};
	
	$scope.sequences = _.range(numberOfSequences).map(function (_) {
		return basic;
	});
	
	$scope.check = function(i) {
		return $scope.guesses[i] == $scope.sequences[i](numberOfGivenElements);
	};
} ]);
