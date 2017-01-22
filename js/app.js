$(function geolocation(){
  $(document).ready(function () {
    $.getJSON("http://ipinfo.io?", function (data) {
        console.log(data);
        //alert(data.ip);
        getcoordinates(data);
    });
});
});

function getcoordinates(position){
  var cityNameFromIp = position.city;
  var countryNameFromIp = position.country;
  var appid = "3f35e5fa08d3ede85124dd3e64acbe1a"
  var  CurrentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q="+cityNameFromIp+"&units=metric&appid="+appid;
  getWeather(CurrentWeatherURL);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $("#weather").html("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $("#weather").html("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $("#weather").html("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $("#weather").html("An unknown error occurred.");
            break;
    }
}
function getWeather(data_url){
  console.log(data_url);

  var $body = $('body');
  var $cityname = $('#city-name');
  var $temperature = $('.temperature');
  var $weatherstate = $('.weather-state');
  var $header  = $('.header');
  $.getJSON(data_url, function(data) {
      console.log(data);
      console.log(data.main.temp);
      $cityname.append(data.name);
      $cityname.append(', '+data.sys.country);
      // TODO: I can push a button to toggle between Fahrenheit and Celsius.
      $temperature.append(data.main.temp+'&#8451;');

      data.weather.forEach(function(val){
        $weatherstate.append(val.main);
        //$weatherstate.append(val.icon);
      });

   });
   // TODO: Fix $.getJSON error handling code.
  //  .error(function(e){
  //     $header.text('New York Times Articles Could Not Be loaded');
  // });
}
