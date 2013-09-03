'use strict';

var module = angular.module('phonetic', []);

module.controller('PhoneticController', [ '$scope', 'PhoneticService', function($scope, service) {
	$scope.update = function update(raw) {
		$scope.words = service.din(raw);
	};
} ]);

module.factory('PhoneticService', [ function() {
	return {
		din : function(raw) {
			var array = raw.split("");
			var characters = _.map(array, function(char) {
				return char.toUpperCase();
			});

			var mapping = {
				"A" : "Anton",
				"Ä" : "Ärger",
				"B" : "Berta",
				"C" : "Cäsar",
				// Ch : "Charlotte",
				"D" : "Dora",
				"E" : "Emil",
				"F" : "Friedrich",
				"G" : "Gustav",
				"H" : "Heinrich",
				"I" : "Ida",
				"J" : "Julius",
				"K" : "Kaufmann",
				"L" : "Ludwig",
				"M" : "Martha",
				"N" : "Nordpol",
				"O" : "Otto",
				"Ö" : "Ökonom",
				"P" : "Paula",
				"Q" : "Quelle",
				"R" : "Richard",
				"S" : "Samuel",
				// "S" : "Siegfried",
				// Sch : "Schule",
				"ß" : "Eszett",
				"T" : "Theodor",
				"U" : "Ulrich",
				"Ü" : "Übermut",
				"V" : "Viktor",
				"W" : "Wilhelm",
				"X" : "Xanthippe",
				"Y" : "Ypsilon",
				"Z" : "Zacharias"
			// "Z" : "Zeppelin"
			};

			var eligible = _.filter(characters, function(char) {
				return mapping.hasOwnProperty(char);
			});

			return _.map(eligible, function(char) {
				return mapping[char];
			});
		}
	};
} ]);
