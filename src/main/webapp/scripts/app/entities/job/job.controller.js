'use strict';

angular.module('monarcPocApp')
    .controller('JobController', function ($scope, $state, $modal, Job, ParseLinks) {
      
        $scope.jobs = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Job.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.jobs = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.job = {
                name: null,
                language: null,
                id: null
            };
        };
    });
