var app = angular.module('tiles', [ 'dragndrop' ]);

// config start
app.value('steamapps', [ {
	id : 232450,
	name : "SolForge"
} ]);
// config end

app.controller('TilesController', [ '$scope', 'steamapps', function($scope, steamapps) {
	$scope._ = _; // lodash

	$scope.handleDrop = function(tile, space, left, top) {
		tile.style.left = left;
		tile.style.top = top;
	};
} ]);
