'use strict';

angular.module('monarcPocApp')
    .controller('JobDetailController', function ($scope, $rootScope, $stateParams, entity, Job, User) {
        $scope.job = entity;
        $scope.load = function (id) {
            Job.get({id: id}, function(result) {
                $scope.job = result;
            });
        };
        var unsubscribe = $rootScope.$on('monarcPocApp:jobUpdate', function(event, result) {
            $scope.job = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
