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

app.controller('TilesController', [ '$scope', '$window', 'steamapps', function($scope, $window, steamapps) {
	$scope._ = _; // lodash
	$scope.steamapps = steamapps;

	$scope.initTile = function(el) {
		var style = $window.getComputedStyle(el, null);
//		var left = style.getPropertyValue("width") - el.getPro
		
		el.style.top = "333px";
		el.style.left = "111px";
	};

	$scope.moveTile = function(area, item, x, y) {
		item.style.left = x + "px";
		item.style.top = y + "px";
	};
} ]);
