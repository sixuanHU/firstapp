'use strict';

/**
 * @ngdoc function
 * @name firstAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firstAppApp
 */
var firstapp = angular.module('firstAppApp',[]);



 firstapp.controller('MainCtrl', function ($scope, $http) {
   $scope.data = {};

   $scope.onSubmit = function(valid) {
     if (valid) {
     console.log("hey,i'm submitted!", valid);
     console.log("$scope.data",$scope.data );

   $http.post('/',$scope.data).
     then(function (data) {
       console.log("hooray");
     }).catch(function(data) {
       console.log("pfff");
     });

} else {
  console.log("Invalid Form !")
}
   };

  });
