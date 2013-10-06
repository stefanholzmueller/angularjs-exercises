var module = angular.module('tiles', []);

// config start
module.value('tiles', 28);
// config end

module.controller('TilesController', [ '$scope', 'tiles', function($scope, tiles) {
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

module.directive('draggable', function() {
	return function(scope, element) {
		// this gives us the native JS object
		var el = element[0];

		el.draggable = true;

		el.addEventListener('dragstart', function(e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.id);
			this.classList.add('drag');
			return false;
		}, false);

		el.addEventListener('dragend', function(e) {
			this.classList.remove('drag');
			return false;
		}, false);
	};
});

module.directive('droppable', function() {
	return {
		scope : {
			onDrop : '&' // parent
		},
		link : function(scope, element) {
			// again we need the native object
			var el = element[0];

			el.addEventListener('dragover', function(e) {
				e.dataTransfer.dropEffect = 'move';
				// allows us to drop
				if (e.preventDefault)
					e.preventDefault();
				this.classList.add('over');
				return false;
			}, false);

			el.addEventListener('dragenter', function(e) {
				this.classList.add('over');
				return false;
			}, false);

			el.addEventListener('dragleave', function(e) {
				this.classList.remove('over');
				return false;
			}, false);

			el.addEventListener('drop', function(e) {
				// Stops some browsers from redirecting.
				if (e.preventDefault) {
					e.preventDefault();
				}
				if (e.stopPropagation) {
					e.stopPropagation();
				}

				this.classList.remove('over');

				scope.onDrop({
					drag : document.getElementById(e.dataTransfer.getData('text')),
					drop : this
				});

				return false;
			}, false);
		}
	};
});
