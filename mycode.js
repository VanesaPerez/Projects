//Global Variables

Google_key = "AIzaSyDBRx0crV33B-rLPoQr7SkYl4_ZrUOZzig";
OWP_key    = "8c8a482f0c519bcc56bf79715ea71154";
var currentStation;
var stations;

// Refresh Button

$(document).on("click", "#refresh", function() {
    //Prevent default behaviour
    event.preventDefault();

    //1. Get Current Location
    $.post("https://www.googleapis.com/geolocation/v1/geolocate?key="+Google_key,
        function (response) {
            //alert("Lat: "+response.location.lat+" Lon: "+response.location.lng);
            lat = response.location.lat;
            lng = response.location.lng;
            call_url = "http://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lng+"&cnt=30&units=metric&APPID="+OWP_key;
            $.getJSON(call_url,
                function (data) {
                    //Process Response from OpenWeatherMaps API Call
                    stations = data.list;
                    //Remove previous stations
                    $('#stations_list li').remove();
                    //Add new stations to the list
                    $.each(stations, function(index,station) {
                        $('#stations_list').append(
                            '<li><a id="to_details" href="#">'+station.name+
                            '<span id="'+index+'" class="ui-li-count">'+Math.round(station.main.temp)+'</span>'+
                            '</a></li>');
                    });
                    //Refresh list content
                    $('#stations_list').listview('refresh');

            });

    })
});

$(document).on('pagebeforeshow','#home', function () {
   $(document).on('click','#to_details',function (e) {
       e.preventDefault();
       e.stopImmediatePropagation();
       //Store the Station ID
       currentStation = stations[e.target.children[0].id];
       //console.log(e);
       //Change to Details Page
       $.mobile.changePage("#details");
   })
});

//Update Details Page
$(document).on('pagebeforeshow','#details', function (e) {
    e.preventDefault();
    console.log(currentStation);
    $('#stationIcon').attr('src','http://openweathermap.org/img/w/'+currentStation.weather[0].icon+'.png');
    $('#stationName').text(currentStation.name);
    $('#stationDescription').text(currentStation.weather[0].description);
    $('#stationTemp').text('Temperature: '+currentStation.main.temp);
    $('#stationHumidity').text('Humidity: '+currentStation.main.humidity+' %');
    $('#stationPressure').text('Pressure: '+currentStation.main.pressure+' hpa');

});
