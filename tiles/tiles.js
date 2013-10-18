var app = angular.module('tiles', [ 'dragndrop' ]);

// config start
app.value('steamapps', [ {
	id : 232450,
	name : "SolForge"
}, {
	id : 225340,
	name : "XCOM - Enemy within"
}, {
	id : 200260,
	name : "Batman: Arkham City - Game of the Year Edition"
} ]);
// config end

app.controller('TilesController', [ '$scope', '$window', 'steamapps', function($scope, $window, steamapps) {
	$scope._ = _; // lodash
	$scope.steamapps = steamapps;

	$scope.initTile = function(el, parent) {
		var elStyle = $window.getComputedStyle(el, null);
		var parentStyle = $window.getComputedStyle(parent, null);
		var maxTop = parseInt(parentStyle.getPropertyValue("height"), 10) - parseInt(elStyle.getPropertyValue("height"), 10);
		var maxLeft = parseInt(parentStyle.getPropertyValue("width"), 10) - parseInt(elStyle.getPropertyValue("width"), 10);
		
		el.style.top = Math.random() * maxTop + "px";
		el.style.left = Math.random() * maxLeft + "px";
	};

	$scope.moveTile = function(area, item, x, y) {
		item.style.left = x + "px";
		item.style.top = y + "px";
	};
} ]);
