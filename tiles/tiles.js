var app = angular.module('tiles', [ 'dragndrop' ]);

// config start
app.value('tiles', 28);
// config end

app.controller('TilesController', [ '$scope', 'tiles', function($scope, tiles) {
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
