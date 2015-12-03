'use strict';

angular.module('monarcPocApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('job', {
                parent: 'entity',
                url: '/jobs',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'monarcPocApp.job.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/job/jobs.html',
                        controller: 'JobController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('job');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('job.detail', {
                parent: 'entity',
                url: '/job/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'monarcPocApp.job.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/job/job-detail.html',
                        controller: 'JobDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('job');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Job', function($stateParams, Job) {
                        return Job.get({id : $stateParams.id});
                    }]
                }
            })
            .state('job.new', {
                parent: 'job',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/job/job-dialog.html',
                        controller: 'JobDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    language: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('job', null, { reload: true });
                    }, function() {
                        $state.go('job');
                    })
                }]
            })
            .state('job.edit', {
                parent: 'job',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/job/job-dialog.html',
                        controller: 'JobDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Job', function(Job) {
                                return Job.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('job', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('job.delete', {
                parent: 'job',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/job/job-delete-dialog.html',
                        controller: 'JobDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Job', function(Job) {
                                return Job.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('job', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
