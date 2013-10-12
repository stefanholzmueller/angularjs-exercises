var app = angular.module('tiles', [ 'dragndrop' ]);

// config start
app.value('steamapps', [ {
	id : 232450,
	name : "SolForge"
} ]);
// config end

app.controller('TilesController', [ '$scope', 'steamapps', function($scope, steamapps) {
	$scope._ = _; // lodash

	$scope.handleDrop = function(tile, space) {
		if (space.children.length > 0) {
			tile.parentElement.appendChild(space.children[0]);
			space.appendChild(tile);
		} else {
			space.appendChild(tile);
		}
		alert('Item has been dropped');
	};
} ]);
