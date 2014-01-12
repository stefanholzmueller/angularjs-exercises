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

var app = angular.module('todolist', ['dragndrop']);

app.controller("todolistController", [
    '$scope',
    'localStorageService',
    function ($scope, localStorageService) {
        $scope.todos = localStorageService.loadTodos();

        $scope.save = function () {
            localStorageService.saveTodos($scope.todos);
        };

        var nextId = function () {
            var maxId = _.max(_.map($scope.todos, function (t) {
                return t.id;
            })) || 0;
            return _.isFinite(maxId) ? maxId + 1 : 1;
        };

        $scope.createTodo = function ($event) {
            var x = $event.offsetX == undefined ? $event.layerX : $event.offsetX;
            var y = $event.offsetY == undefined ? $event.layerY : $event.offsetY;
            $scope.todos.push({ id: nextId(), description: "", today: false, pos: Todo.coords2pos(x, y) });
            $scope.save();
        };

        $scope.moveTodo = function (area, el, x, y) {
            var todo = _.find($scope.todos, function (t) {
                return t.id == el.id;
            });
            todo.pos = Todo.coords2pos(x, y);
            $scope.save();
        };

        $scope.deleteTodo = function (id) {
            _.remove($scope.todos, function (t) {
                return t.id === id;
            });
            $scope.save();
        };
    }
]);

app.service("localStorageService", function () {
    return {
        loadTodos: function () {
            var json = localStorage.getItem("todos");
            return angular.fromJson(json) || [];
        },
        saveTodos: function (todos) {
            var json = angular.toJson(todos);
            localStorage.setItem("todos", json);
        }
    };
});
//# sourceMappingURL=todolist.js.map
