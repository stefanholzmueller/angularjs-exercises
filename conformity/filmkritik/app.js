'use strict';

var module = angular.module('filmkritik', ['conformity']);

module.value('questionnaire', {

	spectrum : _.range(10, 0, -1).map(function(n) {
		return {
			points : n,
			text : n
		};
	}),

	questions : [ "Pretty Woman", "The Matrix", "Sieben" ],

	positions : {
		"Action" : [ 1, 8, 4 ],
		"Romanze" : [ 10, 3, 1 ],
		"Komödie" : [ 3, 2, 2 ],
		"Drama" : [ 4, 5, 7 ],
	}
}

);
