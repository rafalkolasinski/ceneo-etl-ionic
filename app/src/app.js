'use strict';

/**
 * @ngdoc overview
 * @name CeneoETL
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

// Example to require lodash
// This is resolved and bundled by browserify
//
// var _ = require( 'lodash' );

angular.module('CeneoETL', [
    'ionic',
    'ngCordova',
    'ngResource',
    'lokijs'
])
.run([
  '$ionicPlatform',

  function( $ionicPlatform ){

  $ionicPlatform.ready(function(){
    // save to use plugins here
  });

  // add possible global event handlers here

}])

    // configuration and routing

.config([
  '$httpProvider',
  '$stateProvider',
  '$urlRouterProvider',

  function($httpProvider, $stateProvider, $urlRouterProvider){
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('app.etl', {
        url: '/etl',
        cache: true,
        views: {
          'tab-etl': {
            templateUrl: 'templates/views/etl.html',
            controller: 'EtlController'
          }
        }
      })
      .state('reviews', {
        url: '/reviews',
        //cache: true,
        templateUrl: 'templates/views/reviews.html',
        controller: 'ReviewsController',
        params: {
          productId: ""
        }
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/etl');
  }
])

// Angular module controllers
//
  .controller( 'MainController',     require( './controllers/mainController'     ) )
  .controller( 'EtlController',     require( './controllers/etlController'     ) )
  .controller( 'ReviewsController',     require( './controllers/reviewsController' ) )

// Angular module services
//
  .factory( 'HTTPService',        require( './services/HTTPService' ) )
  .factory( 'EtlService',            require( './services/EtlService') )
  .factory( 'DBService',            require( './services/DBService') )
  .factory( 'ProductFactory',            require( './services/ProductFactory') )
  .factory( 'ReviewFactory',            require( './services/ReviewFactory') )
  .factory( 'CSVService',               require( './services/CSVService'))
;
