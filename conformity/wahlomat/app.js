'use strict';

var module = angular.module('wahlomat', [ 'conformity' ]);

module.value('questionnaire', {

	spectrum : [ {
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
	} ],

	questions : [ "Soll der Veggie-Day eingeführt werden?", "Steuern senken?", "Aus der NATO austreten?" ],

	positions : {
		"CDU/CSU" : [ -2, 1, -2 ],
		"SPD" : [ -2, -1, -1 ],
		"Grüne" : [ 2, -2, -1 ],
		"FDP" : [ -2, 2, -2 ],
		"Linke" : [ -1, -2, 2 ],
		"Piraten" : [ -2, 0, 1 ]
	}
}

);
