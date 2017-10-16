var map;
var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var myOptions = {
    zoom: 13, // The larger the zoom number, the bigger the zoom
    center: me,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};


function getMyPosition(){
    if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(somePos) {
		myLatlat = somePos.coords.latitude;
		myLng = somePos.coords.longitude;
		renderMap();
	    }
	    }
	else {
	    alert("Geolocation is not supported by your web browser.  What a shame!");
	});
}

function renderMap()
{
    me = new google.maps.LatLng(myLat, myLng);
  
    // Update map and go there...
    map.panTo(me);
  
    // Create a marker
    marker = new google.maps.Marker({
	    position: me,
	    title: "Here I Am!"
	});
    marker.setMap(map);
    
    // Open info window on click of marker
    google.maps.event.addListener(marker, 'click', function() {
	    infowindow.setContent(marker.title);
	    infowindow.open(map, marker);
	});
}


    var lat = -99999;
	var lng = -99999;

function getLocation() {
    console.log("Hit me 1");
    navigator.geolocation.getCurrentPosition(function(somePos) {
	    console.log("Hit me 2");
	    lat = somePos.coords.latitude;
	    lng = somePos.coords.longitude;
	    console.log(somePos.coords.altitude);
	    printLocation();
	});
    console.log("Hit me 3");
}

function printLocation() {
    elem = document.getElementById("location");
    elem.innerHTML = '<p class="fun">' + lat + ", " + lng + "</p>";
}
