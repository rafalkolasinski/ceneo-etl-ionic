'use strict';

/**
 * @ngdoc function
 * @name CeneoETL.controller:ReviewsController
 * @description
 * # ReviewsController
 */
module.exports = [
    '$scope',
    '$stateParams',
    '$state',
    '$ionicHistory',
    'DBService',
    'CSVService',

    function($scope, $stateParams, $state, $ionicHistory, DBService, CSVService) {
      $scope.productDetails = {};
      $scope.noMoreItems = false;
      $scope.reviews = [];
      var productId = $stateParams.productId;
      var productData = [];
      var hasDataLoaded = false;

      function init() {
        if (!productId) {
          return $state.go('app.etl', {});
        }
        DBService.getProductWithId(productId).then(function(data) {
          hasDataLoaded = true;
          productData = data;

          $scope.productDetails = {
            brand: productData.brand,
            model: productData.model,
            id: productData.id
          };
        });
      }

      function _findReviewWithId(reviewId) {
        for( var key in productData.reviews) {
          if(productData.reviews[key].id === reviewId) {
            return productData.reviews[key];
          }
        }
        return {};
      };

      $scope.goBack = function(){
        $ionicHistory.goBack();
      };

      $scope.loadMoreItems = function() {
        if (!productId) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }
        var reviewsSize = $scope.reviews.length;
        var xhrReviewsSize = productData.reviews.length;
        $scope.reviews.push(productData.reviews[reviewsSize]);

        if(reviewsSize === xhrReviewsSize-1) {
          $scope.noMoreItems = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      };

      $scope.$on('$stateChangeSuccess', function() {
        if(hasDataLoaded && productId) {
          $scope.loadMoreItems();
        }
      });

      $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
        viewData.enableBack = true;
      });

      // @TODO: implement single review save to CSV
      $scope.saveReview = function(reviewId) {
        var reviewToSave = _findReviewWithId(reviewId);
        return CSVService.saveSingleReviewToTXT(reviewToSave, productId);
      };

      $scope.getNumber = function(num) {
        return new Array(parseInt(num));
      };

      $scope.hasHalfStar = function(numberOfStars) {
        var number = parseFloat(numberOfStars.replace(',', '.'));
        var modulo;
        if(number >= 1) {
          modulo = number % parseInt(number);
        }else {
          modulo = number;
        }
        return modulo > 0;
      };

      init();
    }
];
