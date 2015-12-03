 'use strict';

angular.module('monarcPocApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-monarcPocApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-monarcPocApp-params')});
                }
                return response;
            }
        };
    });
