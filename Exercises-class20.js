function displayError(error) {
    var errors = {
        0: 'unknown error',
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error occurred: " + errors[error.code]);
}



//document.getElementById("btn-position").onclick = function() {inicia()};
//document.getElementById("btn-position").addEventListener("click", inicia(););
function setup() {
document.getElementById("map-sel").addEventListener("onchange", showMap);
//alert('Inicio');
}

function inicia() {
    navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById('currentLat').innerHTML = position.coords.latitude;
        document.getElementById('currentLon').innerHTML = position.coords.longitude;
    }, displayError) ;   
	
	var lista= document.getElementById('two');
	mostrarlista(lista);

}

function mostrarlista(lista){
	if (lista.className=='hidden') {
	lista.className='';
	}
}

function showMap() {
	var mySel = document.getElementById("map-sel");
	
	
var lat=document.getElementById('currentLat').innerHTML;
var lon=document.getElementById('currentLon').innerHTML;
var url='http://maps.google.com/maps/api/staticmap?center='+lat+','+lon+'&zoom=15&size=512x512&sensor=true&maptype='+mySel.value;  

document.getElementById('aurl').innerHTML=url;
document.getElementById('aurl').href=url;
document.getElementById('static-map').src=url;


}





