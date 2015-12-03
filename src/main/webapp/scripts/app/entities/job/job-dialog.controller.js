'use strict';

angular.module('monarcPocApp').controller('JobDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Job', 'User',
        function($scope, $stateParams, $modalInstance, entity, Job, User) {

        $scope.job = entity;
        $scope.users = User.query();
        $scope.load = function(id) {
            Job.get({id : id}, function(result) {
                $scope.job = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('monarcPocApp:jobUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.job.id != null) {
                Job.update($scope.job, onSaveSuccess, onSaveError);
            } else {
                Job.save($scope.job, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
