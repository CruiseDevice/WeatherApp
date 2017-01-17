(function(){
'use struct';
angular.module('weatherApp',[])
.controller('weatherAppController',weatherAppController);
weatherAppController.inject = ['$scope'];
function weatherAppController($scope){
  $scope.mainTitle = "FreeCodeCamp";
  $scope.title = "Weather App";
  $scope.inspiredBy = "joshbader";
}
})();
