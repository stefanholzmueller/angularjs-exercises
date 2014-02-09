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

angular.module('todolist', [ 'dragndrop' ]);

angular.module('todolist').config(['$compileProvider', function ($compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data):/);
}]);

angular.module('todolist').controller("todolistController", [ '$scope', '$location', 'localStorageService', function ($scope, $location, localStorageService) {
	$scope.todos = localStorageService.loadTodos();

	$scope.backup = btoa(localStorageService.loadJson());

	$scope.$watch('todos', function (newValue) {
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

angular.module('todolist').service("localStorageService", function () {
	return {
		loadJson: function () : string {
			return localStorage.getItem("todos");
		},
		loadTodos: function () : Array<Todo> {
			var json = this.loadJson();
			return angular.fromJson(json) || [];
		},
		saveTodos: function (todos : Array<Todo>) {
			var json = angular.toJson(todos);
			localStorage.setItem("todos", json);
		}
	};
});