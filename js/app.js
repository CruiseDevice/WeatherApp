(function(){
'use struct';
angular.module('weatherApp',[])
.controller('weatherAppController',weatherAppController);
weatherAppController.inject = ['$scope'];
weatherAppController.inject = ['$http'];
function weatherAppController($scope,$http){
  $scope.mainTitle = "FreeCodeCamp";
  $scope.title = "Weather App";
  $scope.inspiredBy = "joshbader";

  var vm = this;
  var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

  var request = {
    method: 'GET',
   url: URL,
   params: {
      q: 'KansasCity',
     mode: 'json',
     units: 'imperial',
     cnt: '7',
     appid: '3f35e5fa08d3ede85124dd3e64acbe1a'
   }
 };

 $http(request)
    .then(function(response) {
      vm.data = response.data;
    }).
    catch(function(response) {
      vm.data = response.data;
  });

}
})();
