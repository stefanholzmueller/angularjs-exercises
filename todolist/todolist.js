/// <reference path="lib/angular/angular.d.ts" />
/// <reference path="lib/lodash/lodash.d.ts" />
var Todo = (function () {
    function Todo() {
    }
    Todo.coords2pos = function (x, y) {
        return "left: " + x + "px; top: " + y + "px;";
    };
    return Todo;
})();

angular.module('todolist', ['dragndrop']);

angular.module('todolist').config([
    '$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data):/);
    }
]);

angular.module('todolist').controller("todolistController", [
    '$scope',
    '$location',
    'localStorageService',
    function ($scope, $location, localStorageService) {
        $scope.todos = localStorageService.loadTodos();

        $scope.backup = btoa(localStorageService.loadJson());

        $scope.$watch('todos', function (newValue) {
            localStorageService.saveTodos(newValue);
        }, true);

        var nextId = function () {
            var maxId = _.max(_.map($scope.todos, function (t) {
                return t.id;
            })) || 0;
            return _.isFinite(maxId) ? maxId + 1 : 1;
        };

        $scope.createTodo = function (x, y) {
            $scope.todos.push({ id: nextId(), description: "", today: false, pos: Todo.coords2pos(x, y) });
        };

        $scope.moveTodo = function (area, el, x, y) {
            var todo = _.find($scope.todos, function (t) {
                return t.id == el.id;
            });
            todo.pos = Todo.coords2pos(x, y);
        };

        $scope.deleteTodo = function (id) {
            _.remove($scope.todos, function (t) {
                return t.id === id;
            });
        };
    }
]);

angular.module('todolist').service("localStorageService", function () {
    return {
        loadJson: function () {
            return localStorage.getItem("todos");
        },
        loadTodos: function () {
            var json = this.loadJson();
            return angular.fromJson(json) || [];
        },
        saveTodos: function (todos) {
            var json = angular.toJson(todos);
            localStorage.setItem("todos", json);
        }
    };
});
//# sourceMappingURL=todolist.js.map
