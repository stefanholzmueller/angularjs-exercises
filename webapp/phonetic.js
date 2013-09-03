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
				return char.toLowerCase();
			});

			var mapping = {
				"a" : "Anton",
				"ä" : "Ärger",
				"b" : "Berta",
				"c" : "Cäsar",
				// Ch : "Charlotte",
				"d" : "Dora",
				"e" : "Emil",
				"f" : "Friedrich",
				"g" : "Gustav",
				"h" : "Heinrich",
				"i" : "Ida",
				"j" : "Julius",
				"k" : "Kaufmann",
				"l" : "Ludwig",
				"m" : "Martha",
				"n" : "Nordpol",
				"o" : "Otto",
				"ö" : "Ökonom",
				"p" : "Paula",
				"q" : "Quelle",
				"r" : "Richard",
				"s" : "Samuel",
				// "S" : "Siegfried",
				// Sch : "Schule",
				"ß" : "Eszett",
				"t" : "Theodor",
				"u" : "Ulrich",
				"ü" : "Übermut",
				"v" : "Viktor",
				"w" : "Wilhelm",
				"x" : "Xanthippe",
				"y" : "Ypsilon",
				"z" : "Zacharias"
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
