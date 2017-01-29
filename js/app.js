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
        weather_id = val.id;
        console.log(weather_id);
        seticon(weather_id);
      });
   });
}
function seticon(weather_id){
  // console.log(weather_id);
  switch(weather_id){
    case 800:
      $('.weather-icons').html('<div class = "icon sunny">'+
      '<div class = "sun">'+
      '<div class = "rays">'+'</div></div></div>');
      break;
    case 500:
      $('.weather-icons').html('<div class = "icon sun-shower">'                        +
                                  '<div class = "cloud"></div>'                         +
                                  '<div class = "sun"><div class = "rays"></div></div>' +
                                  '<div class = "rain">'+'</div></div>');
      break;
    case 200:
      $('.weather-icons').html('<div class="icon thunder-storm">'                       +
                                  '<div class="cloud"></div>'                           +
                                  '<div class="lightning">'                             +
                                  '<div class="bolt"></div>'                            +
                                  '<div class="bolt"></div>'                            +
                                  '</div>'                                              +
                              '</div>');
      break;

    case 801:
      $('.weather-icons').html('<div class="icon cloudy">'                              +
                                  '<div class="cloud"></div>'                           +
                                  '<div class="cloud"></div>'                           +
                              '</div>');
      break;

    case 600:
      $('.weather-icons').html('<div class="icon flurries">'                            +
                                  '<div class="cloud"></div>'                           +
                                  '<div class="snow">'                                  +
                                    '<div class="flake"></div>'                         +
                                    '<div class="flake"></div>'                         +
                                  '</div>'                                              +
                                '</div>');
      break;

    case 500:
      $('weather-icons').html('<div class="icon rainy">'                                +
                                '<div class="cloud"></div>'                             +
                                '<div class="rain"></div>'                              +
                              '</div>');
      break;
  }
}
