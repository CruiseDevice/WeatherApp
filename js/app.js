$(function geolocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getcoordinates,showError);
  }else{
    $("#weather").html("Geolocation is not supported by this browser.");
  }
});

function getcoordinates(position){
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  //var units=localStorage.getItem("Units");
  var appid = "3f35e5fa08d3ede85124dd3e64acbe1a"
  var CurrentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+appid;
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
      // var html = "";
      console.log(data);
      console.log(data.main.temp);
      //console.log(data.weather.main);
      //var tempincelsius = data.main.temp - 273.15;
      $cityname.append(data.name);
      $cityname.append(', '+data.sys.country);
      $temperature.append(data.main.temp+'&#8451;');
      data.weather.forEach(function(val){
        $weatherstate.append(val.main);
        //$weatherstate.append(val.icon);
      });
  }).error(function(e) {
    $header.text('Sorry Content could not be Loaded. Please check you computer is connected to internet.');
  });;
}
