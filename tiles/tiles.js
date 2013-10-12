var app = angular.module('tiles', [ 'dragndrop' ]);

// config start
app.value('steamapps', [ {
	id : 232450,
	name : "SolForge"
}, {
	id : 225340,
	name : "XCOM - Enemy within"
} ]);
// config end

app.controller('TilesController', [ '$scope', 'steamapps', function($scope, steamapps) {
	$scope._ = _; // lodash
	$scope.steamapps = steamapps;

	$scope.moveTile = function(area, item, x, y) {
		item.style.left = x + "px";
		item.style.top = y + "px";
	};
} ]);
