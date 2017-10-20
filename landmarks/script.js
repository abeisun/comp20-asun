var map;
var myLat = 0;
var myLng = 0;
getMyPosition();
var marker;

function initMap(){
	var myOptions = {
    zoom: 13, // The larger the zoom number, the bigger the zoom
    center: me,
    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	console.log(myLat + ", " + myLng)
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	makeRequests();
}

function getMyPosition(){
    if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
		me = new google.maps.LatLng(myLat, myLng);
		initMap();
		renderMap();
	    });
	    }
	else {
	    alert("Geolocation is not supported by your web browser.");
	}
}

function renderMap()
{
    me = new google.maps.LatLng(myLat, myLng);
  
    // Update map and go there...
    map.panTo(me);
  
  	var image = {
		url: "cat_icon.png",
		scaledSize: new google.maps.Size(50, 50)
	};
    // Create a marker
    marker = new google.maps.Marker({
	    position: me,
	    icon: image
	});
    marker.setMap(map);
}

function makeRequests()
{
	request = new XMLHttpRequest('u1QcvwrF', myLat, myLng);
	request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {//Call a function when the state changes.
    if(request.readyState == 4 && request.status == 200) {
       // alert(request.responseText);
        parseData();
    }
	}
	request.send('login=u1QcvwrF&lat='+myLat+'&lng='+myLng);
	//request.responseText;
}

function parseData()
{
	locations = JSON.parse(request.responseText);
	console.log(locations);
	addMarkers();
}

function addMarkers()
{
	var image = {
		url: "dog_icon.png",
		scaledSize: new google.maps.Size(50, 50)
	};
	//var image = "cat_icon.png";
	for (var person in locations.people){
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations.people[person].lat, locations.people[person].lng),
			map:map,
			icon: image,
			login: locations.people[person].login
		});

		google.maps.event.addListener(marker, 'click', function (){
                 // infowindow.setContent(this.content);
           	distance_from = google.maps.geometry.spherical.computeDistanceBetween(me, this.position)/1609.344;
           	contentString = '<p class="login">'+this.login+'<p/><p class="distance">' + distance_from.toString() + "h<p/>";
           	infowindow = new google.maps.InfoWindow({
			content: contentString
			});
            infowindow.open(map, this);
        });
	}
	addLandmarks();
}

function addLandmarks()
{
	var image = {
		url: "pawprint_icon.png",
		scaledSize: new google.maps.Size(50, 50)
	};
	for (var landmark in locations.landmarks){
		console.log(locations.landmarks[landmark].geometry.coordinates[0]);
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations.landmarks[landmark].geometry.coordinates[1], locations.landmarks[landmark].geometry.coordinates[0]),
			map:map,
			icon: image,
			//login: locations.people[person].login
		});
	}
}



