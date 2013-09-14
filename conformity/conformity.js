'use strict';

var module = angular.module('conformity', []);

module.controller('ConformityController', [ '$scope', 'questionnaire', function($scope, questionnaire) {
	$scope.spectrum = questionnaire.spectrum;
	$scope.questions = questionnaire.questions;
	$scope.positions = questionnaire.positions;
	
	$scope.answers = [];
	$scope.currentQuestion = 0;

	$scope.vote = function(points) {
		$scope.answers[$scope.currentQuestion] = points;
		$scope.currentQuestion = ($scope.currentQuestion + 1) % $scope.questions.length;
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
