'use strict';

function ConformityController($scope) {
	$scope.spectrum = {
		"-2" : "entschieden dagegen",
		"-1" : "eher dagegen",
		0 : "egal",
		1 : "eher dafür",
		2 : "entschieden dafür"
	};

	$scope.questions = [ "Soll der Veggie-Day eingeführt werden?", "Steuern senken?", "Aus der NATO austreten?" ];

	$scope.answers = {
		"CDU/CSU" : [ -2, 1, -2 ],
		"SPD" : [ -2, -1, -1 ],
		"Grüne" : [ 2, -2, -1 ],
		"FDP" : [ -2, 2, -2 ],
		"Linke" : [ -2, -2, 2 ],
		"Piraten" : [ -2, 0, 1 ]
	};

	var currentQuestion = $scope.currentQuestion = 0;
	var answer = $scope.answer = [];

	$scope.vote = function(points) {
		answer[currentQuestion] = points;
		currentQuestion = ++currentQuestion % $scope.questions.length;
	};
}
