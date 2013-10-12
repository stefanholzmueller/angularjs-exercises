var module = angular.module('dragndrop', []);

module.directive('dragItem', function() {
	return function(scope, element) {
		// this gives us the native JS object
		var el = element[0];

		el.draggable = true;

		el.addEventListener('dragstart', function(e) {
			var style = window.getComputedStyle(event.target, null);
			var payload = JSON.stringify({
				id : this.id,
				x : (parseInt(style.getPropertyValue("left"), 10) - event.clientX),
				y : (parseInt(style.getPropertyValue("top"), 10) - event.clientY)
			});

			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', payload);
			this.classList.add('drag');

			return false;
		}, false);

		el.addEventListener('dragend', function(e) {
			this.classList.remove('drag');
			return false;
		}, false);
	};
});

module.directive('dropArea', function() {
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

				var payload = JSON.parse(e.dataTransfer.getData('text'));

				scope.onDrop({
					drag : document.getElementById(payload.id),
					drop : this
				});

				return false;
			}, false);
		}
	};
});
