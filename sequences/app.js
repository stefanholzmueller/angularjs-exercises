var module = angular.module('sequences', []);

// config start
module.value('numberOfSequences', 10);
module.value('numberOfGivenElements', 5);
// config end

module.controller('SequencesController', [ '$scope', 'numberOfSequences', 'numberOfGivenElements', function($scope, numberOfSequences, numberOfGivenElements) {
	$scope.sequences = _.range(numberOfSequences);
	$scope.given = _.range(numberOfGivenElements);
} ]);
