//Global Variables

Google_key = "AIzaSyDQVpoQl_Qs9sX8mElHOOvWKK5_n8HKDFw";
//OWP_key    = "8c8a482f0c519bcc56bf79715ea71154";

var currentStation;
var stations;



// Refresh Button

$(document).on("click", "#refresh", function() {
    //Prevent default behaviour
    event.preventDefault();

    //1. Get Current Location
    var geolocation = "https://www.googleapis.com/geolocation/v1/geolocate?key="+Google_key;

        $.post(geolocation,
        function (response) {
            //alert("Lat: "+response.location.lat+" Lon: "+response.location.lng);
            lat = response.location.lat;
            lng = response.location.lng;
            call_url =  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=50000&type=restaurant&keyword=cruise&key="+Google_key;
            // call_url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?lat="+lat+"&lon="+lng+"radius=5000&type=park&key="+Google_key;
            $.getJSON(call_url,
                function (data) {
                    //console.log(data);
                    //Process Response from OpenWeatherMaps API Call
                    stations = data.results;
                    //console.log(stations);
                    //Remove previous stations
                    $('#stations_list li').remove();
                    //Add new stations to the list
                    for(var n=0;n<stations.length;n++){
                        if (stations[n].opening_hours = true) {
                            $('#stations_list').append(
                                '<li><a id="to_details" href="#">'+stations[n].name+
                                '<span id="'+n+'" class="ui-li-count"></span>'+
                                '</a></li>');
                        }

                        console.log(stations);
                    }
                    //Refresh list content
                    $('#stations_list').listview('refresh');

                });

        })
    //console.log(stations);
});

$(document).on('pagebeforeshow','#home', function () {
    $(document).on('click','#to_details',function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        //Store the Station ID
        currentStation = stations[e.target.children[0].id];
        console.log(currentStation);
        //Change to Details Page
        $.mobile.changePage("#details");
    })
});

//Update Details Page
$(document).on('pagebeforeshow','#details', function (e) {
    //console.log("Antes de cargar details");
    $(document).on('click','#map_btn',function (e) {

        e.preventDefault();
        e.stopImmediatePropagation();
        //lat=currentStation.geometry.location.lat;
       // lng=currentStation.geometry.location.lng;
        //console.log("En el click lat="+lat+" lng="+lng);
        //Store the Station ID
        //currentStation = stations[e.target.children[0].id];
        console.log(currentStation);

        //Change to Details Page
        $.mobile.changePage("#map-page");
    })

    //console.log("procesando datos en details");
    e.preventDefault();
    console.log(currentStation);
    $('#stationIcon').attr('src',currentStation.icon);
    $('#stationName').text(currentStation.name);
    //$('#stationDescription').text(currentStation.rating);
    $('#Rating').text('Rating: '+currentStation.rating);
    $('#Vecinity').text('Vicinity: '+currentStation.vicinity);
    //$('#stationPressure').text('Pressure: '+currentStation.main.pressure+' hpa');

});


/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
$( document ).on( "pagebeforeshow", "#map-page", function() {
    //console.log("lat="+lat+" lng="+lng);
    var defaultLatLng = new google.maps.LatLng(currentStation.geometry.location.lat, currentStation.geometry.location.lng);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(currentStation.geometry.location.lat, currentStation.geometry.location.lng));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 17,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        };


        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

        google.maps.event.addListenerOnce(map,'idle',function(){
            var center = map.getCenter();
            google.maps.event.trigger(map,'resize');
            map.setCenter(center);
        })

        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: currentStation.name
        });


    }

});

