'use strict';

angular.module('monarcPocApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


