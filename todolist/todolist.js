/// <reference path="lib/angular/angular.d.ts" />
/// <reference path="lib/lodash/lodash.d.ts" />
var Todo = (function () {
    function Todo() {
        this.today = false;
    }
    Todo.pos2str = function (x, y) {
        return "left: " + x + "px; top: " + y + "px;";
    };
    return Todo;
})();

var app = angular.module('todolist', ['dragndrop']);

app.controller("todolistController", [
    '$scope',
    '$window',
    function ($scope, $window) {
        var todos = [
            { id: 1, description: "aDescription", today: true, pos: "left: 444px; top: 666px;" }
        ];
        $scope.todos = todos;

        var nextId = function () {
            return 1 + _.max(_.result($scope.todos, "id"));
        };

        $scope.createTodo = function ($event) {
            var pos = Todo.pos2str($event.offsetX, $event.offsetY);
            $scope.todos.push({ id: nextId(), description: "asdasdasd", today: false, pos: pos });
        };

        $scope.moveTodo = function (area, item, x, y) {
            item.style.left = x + "px";
            item.style.top = y + "px";
        };
    }
]);

app.directive('keypressEvents', [
    function () {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                $element.bind('keypress', function (e) {
                    $scope.$apply(function () {
                        $scope.$emit('keypress', e.which);
                    });
                });
            }
        };
    }
]);

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
//# sourceMappingURL=todolist.js.map
