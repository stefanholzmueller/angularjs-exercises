/// <reference path="lib/angular/angular.d.ts" />
/// <reference path="lib/lodash/lodash.d.ts" />

class Todo {
	id : number;
	description : string;
	today : boolean = false;
	pos : string;

	static coords2pos = function (x, y) {
		return "left: " + x + "px; top: " + y + "px;";
	}
}

var app = angular.module('todolist', [ 'dragndrop' ]);

app.controller("todolistController", [ '$scope', function ($scope) {
	var todos : Array<Todo> = [
		{ id: 1, description: "aDescription", today: true, pos: "left: 444px; top: 666px;"}
	];
	$scope.todos = todos;

	var nextId = function () {
		return 1 + _.max(_.map($scope.todos, t => t.id));
	};

	$scope.createTodo = function ($event) {
		var pos = Todo.coords2pos($event.offsetX, $event.offsetY);
		$scope.todos.push({id: nextId(), description: "", today: false, pos: pos});
	};

	$scope.moveTodo = function (area, item, x, y) {
		item.style.left = x + "px";
		item.style.top = y + "px";
	};

	$scope.deleteTodo = function (id) {
		_.remove($scope.todos, t => t.id === id);
	};
}]);

app.directive('stopEvent', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element.bind(attr.stopEvent, function (e) {
				e.stopPropagation();
			});
		}
	};
});