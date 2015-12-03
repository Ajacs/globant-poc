'use strict';

angular.module('monarcPocApp')
	.controller('JobDeleteController', function($scope, $modalInstance, entity, Job) {

        $scope.job = entity;
        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Job.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });