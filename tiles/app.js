var module = angular.module('tiles', []);

// config start
module.value('tileSize', 100);
// config end

module.controller('TilesController', [ '$scope', 'tileSize', function($scope, tileSize) {
} ]);
