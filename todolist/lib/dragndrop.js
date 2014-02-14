angular.module('dragndrop', []);

angular.module('dragndrop').directive('dragItem', function () {
    return function (scope, element, attrs) {
        var el = element[0];

        el.draggable = true;

        var userFnName = attrs['onInit'];
        if (userFnName) {
            var userFn = scope[userFnName];
            userFn(el, element.parent()[0]);
        }

        el.addEventListener('dragstart', function (e) {
            var style = window.getComputedStyle(e.target, null);
            var payload = JSON.stringify({
                id: this.id,
                dragX: (parseInt(style.getPropertyValue("left"), 10) - e.clientX),
                dragY: (parseInt(style.getPropertyValue("top"), 10) - e.clientY)
            });

            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text', payload);
            this.classList.add('drag');

            return false;
        }, false);

        el.addEventListener('dragend', function (e) {
            this.classList.remove('drag');
            return false;
        }, false);
    };
});

angular.module('dragndrop').directive('dropArea', ['util', function (util) {
    return {
        link: function (scope, element, attrs) {
            var el = element[0];

            el.addEventListener('dragover', function (e) {
                e.dataTransfer.dropEffect = 'move';
                if (e.preventDefault) {
                    e.preventDefault();
                }
                return false;
            }, false);

            el.addEventListener('drop', function (e) {
                // Stops some browsers from redirecting.
                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                var payload = JSON.parse(e.dataTransfer.getData('text'));

                util.callbackInScope(scope, attrs['onDrop'], function (callback) {
                    var id = document.getElementById(payload.id).id;
                    var x = e.clientX + parseInt(payload.dragX, 10);
                    var y = e.clientY + parseInt(payload.dragY, 10);
                    callback(id, x, y);
                });

                return false;
            }, false);

            el.addEventListener('click', function (e) {
                if (e.srcElement == el) {
                    util.callbackInScope(scope, attrs['onClick'], function (callback) {
                        var x = e.offsetX == undefined ? e.layerX : e.offsetX;
                        var y = e.offsetY == undefined ? e.layerY : e.offsetY;
                        callback(x, y);
                    });
                }
                return false;
            }, false);
        }
    };
}]);

angular.module('dragndrop').factory('util', function () {
    return {
        callbackInScope: function (scope, callbackName, fn) {
            scope.$apply(function () {
                var callback = scope[callbackName];
                if (callback) {
                    fn(callback);
                } else {
                    throw new Error("no callback found");
                }
            });
        }
    };
});
