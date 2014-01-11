/// <reference path="lib/angular/angular.d.ts" />
/// <reference path="lib/lodash/lodash.d.ts" />

class Todo {
	title : string;
	description : string;
}

var app = angular.module('todolist', [ 'dragndrop' ]);

app.controller("todolistController", [ '$scope', '$window', function ($scope, $window) {
	$scope.todos = [
		{ id: 1, title: "aTitle", description: "aDescription", today: true, pos: "left:444px; top:666px;"}
	]

	$scope.moveTodo = function (area, item, x, y) {
		item.style.left = x + "px";
		item.style.top = y + "px";
	};
}]);

app.directive('keypressEvents', [
	function () {
		return {
			restrict: 'A',
			link: function ($scope, $element) {
				$element.bind('keypress', function (e) {
					$scope.$apply(function () {
						$scope.$emit('keypress', e.which);
					})
				});
			}
		};
	}
]);