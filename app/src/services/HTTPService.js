'use strict';

/**
 * @ngdoc function
 * @name CeneoETL.service:ExampleService
 * @description
 * # ExampleService
 */
module.exports = [
    '$http',

    function($http) {
        var makeRequest = function(url, requestType, params) {
            var customUrl = "";
            var ceneoUrl = "http://www.ceneo.pl/";
            var prefix = [
                window.location.origin,
                window.location.pathname,
                "proxy?url="
            ].join("");

            console.log(typeof url);
            customUrl = [
                prefix,
                ceneoUrl,
                url,
                "/opinie-1;0160-1"
            ].join("");


            return $http({
                method: 'GET',
                url: customUrl
            }).success(function(res) {
                console.log('Successfully got ETL server data.');
                return res;
            }).error(function(err) {
                console.log('An error occured while getting ETL server data.');
                return null;
            });
        };

        var parseResponse = function(data) {};

        return {
            makeRequest: makeRequest,
            parseResponse: parseResponse
        };
    }
];