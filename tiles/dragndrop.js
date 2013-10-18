var module = angular.module('dragndrop', []);

module.directive('dragItem', function() {
	return function(scope, element, attrs) {
		// this gives us the native JS object
		var el = element[0];

		el.draggable = true;

		 var userFnName = attrs['onInit'];
		 var userFn = scope[userFnName];
		 userFn(el);

		el.addEventListener('dragstart', function(e) {
			var style = window.getComputedStyle(e.target, null);
			var payload = JSON.stringify({
				id : this.id,
				dragX : (parseInt(style.getPropertyValue("left"), 10) - e.clientX),
				dragY : (parseInt(style.getPropertyValue("top"), 10) - e.clientY)
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
		link : function(scope, element, attrs) {
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

				var args = {
					area : this,
					item : document.getElementById(payload.id),
					x : (e.clientX + parseInt(payload.dragX, 10)),
					y : (e.clientY + parseInt(payload.dragY, 10))
				};

				scope.$apply(function(scope) {
					var userFnName = attrs['onDrop'];
					var userFn = scope[userFnName];
					userFn(args.area, args.item, args.x, args.y);
				});

				return false;
			}, false);
		}
	};
});
