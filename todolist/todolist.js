/// <reference path="lib/angular/angular.d.ts" />
/// <reference path="lib/lodash/lodash.d.ts" />
var Todo = (function () {
    function Todo() {
    }
    return Todo;
})();

var app = angular.module('todolist', ['dragndrop']);

app.controller("TodolistController", [
    '$scope',
    '$window',
    function ($scope, $window) {
        $scope.initTodo = function (el, parent) {
            var elStyle = $window.getComputedStyle(el, null);
            var parentStyle = $window.getComputedStyle(parent, null);
            var maxTop = parseInt(parentStyle.getPropertyValue("height"), 10) - parseInt(elStyle.getPropertyValue("height"), 10);
            var maxLeft = parseInt(parentStyle.getPropertyValue("width"), 10) - parseInt(elStyle.getPropertyValue("width"), 10);

            el.style.top = Math.random() * maxTop + "px";
            el.style.left = Math.random() * maxLeft + "px";
        };

        $scope.moveTodo = function (area, item, x, y) {
            item.style.left = x + "px";
            item.style.top = y + "px";
        };
    }
]);
//# sourceMappingURL=todolist.js.map
