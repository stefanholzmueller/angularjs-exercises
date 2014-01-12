/// <reference path="lib/angular/angular.d.ts" />
/// <reference path="lib/lodash/lodash.d.ts" />

class Todo {
	id : number;
	description : string;
	today : boolean;
	pos : string;

	static coords2pos = function (x, y) {
		return "left: " + x + "px; top: " + y + "px;";
	}
}

var app = angular.module('todolist', [ 'dragndrop' ]);

app.controller("todolistController", [ '$scope', 'localStorageService', function ($scope, localStorageService) {
	$scope.todos = localStorageService.loadTodos();

	var save = function () {
		localStorageService.saveTodos($scope.todos);
	};

	var nextId = function () {
		return 1 + _.max(_.map($scope.todos, t => t.id));
	};

	$scope.createTodo = function ($event) {
		var x = $event.offsetX == undefined ? $event.layerX : $event.offsetX;
		var y = $event.offsetY == undefined ? $event.layerY : $event.offsetY;
		$scope.todos.push({id: nextId(), description: "", today: false, pos: Todo.coords2pos(x, y)});
		save();
	};

	$scope.moveTodo = function (area, el, x, y) {
		el.style.left = x + "px";
		el.style.top = y + "px";
		var todo : Todo = _.find($scope.todos, t => t.id == el.id); // type coercion!
		todo.pos = Todo.coords2pos(x, y);
		save();
	};

	$scope.deleteTodo = function (id) {
		_.remove($scope.todos, t => t.id === id);
		save();
	};
}]);

app.service("localStorageService", function () {
	return {
		loadTodos: function () : Array<Todo> {
			var json = localStorage.getItem("todos");
			return angular.fromJson(json) || [];
		},
		saveTodos: function (todos : Array<Todo>) {
			var json = angular.toJson(todos);
			localStorage.setItem("todos", json);
		}
	};
});