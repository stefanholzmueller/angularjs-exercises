'use strict';

var module = angular.module('conformity', []);

module.controller('ConformityController', [ '$scope', function($scope) {
	$scope.spectrum = [ {
		points : -2,
		text : "entschieden dagegen"
	}, {
		points : -1,
		text : "eher dagegen"
	}, {
		points : 0,
		text : "egal"
	}, {
		points : 1,
		text : "eher dafür"
	}, {
		points : 2,
		text : "entschieden dafür"
	} ];
	$scope.questions = [ "Soll der Veggie-Day eingeführt werden?", "Steuern senken?", "Aus der NATO austreten?" ];
	$scope.positions = {
		"CDU/CSU" : [ -2, 1, -2 ],
		"SPD" : [ -2, -1, -1 ],
		"Grüne" : [ 2, -2, -1 ],
		"FDP" : [ -2, 2, -2 ],
		"Linke" : [ -1, -2, 2 ],
		"Piraten" : [ -2, 0, 1 ]
	};

	$scope.answers = [];
	$scope.currentQuestion = 0;

	$scope.vote = function(points) {
		$scope.answers[$scope.currentQuestion] = points;
		$scope.currentQuestion = ++$scope.currentQuestion % $scope.questions.length;
	};

	$scope.calc = function(position) {
		var similarity = _.zip($scope.answers, $scope.positions[position]).map(function(both) {
			return Math.abs(both[0] - both[1]);
		}).reduce(function(sum, num) {
			return sum + (_.isFinite(num) ? num : 0);
		});
		var worst = $scope.answers.length * Math.abs(_.last($scope.spectrum).points - _.first($scope.spectrum).points);
		return 1 - similarity / worst;
	};
	
	$scope.textForPoints = function(points) {
		return _.find($scope.spectrum, function(s) {
			return s.points === points;
		}).text;
	};
} ]);

module.filter('percentage', [ '$filter', function(filter) {
	return function(number) {
		if (_.isFinite(number)) {
			return filter('number')(number * 100, 0) + " %";
		} else {
			return "";
		}
	};
} ]);
