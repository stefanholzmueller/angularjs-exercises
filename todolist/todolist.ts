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

	$scope.$watch('todos', function(newValue) {
		localStorageService.saveTodos(newValue);
	}, true);

	var nextId = function () {
		var maxId = _.max(_.map($scope.todos, t => t.id)) || 0;
		return _.isFinite(maxId) ? maxId + 1 : 1;
	};

	$scope.createTodo = function ($event) {
		var x = $event.offsetX == undefined ? $event.layerX : $event.offsetX;
		var y = $event.offsetY == undefined ? $event.layerY : $event.offsetY;
		$scope.todos.push({id: nextId(), description: "", today: false, pos: Todo.coords2pos(x, y)});
	};

	$scope.moveTodo = function (area, el, x, y) {
		var todo : Todo = _.find($scope.todos, t => t.id == el.id); // type coercion!
		todo.pos = Todo.coords2pos(x, y);
	};

	$scope.deleteTodo = function (id) {
		_.remove($scope.todos, t => t.id === id);
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