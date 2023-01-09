let map;

function initMap() {
    $.getJSON('json/earthquake.json', function(data) {
	const center = new google.maps.LatLng(37.8103096,-95.545988);
	var map = new google.maps.Map(document.getElementById("map"), {
	    zoom: 2,
	    center: center,
	    mapTypeId: "roadmap",
	});
	// Loop through the data array and place a marker for each
	// set of coordinates.
	for (let i = 0; i < data.features.length; i++) {
	    const coords = data.features[i].geometry.coordinates;
	    const position = new google.maps.LatLng(coords[1], coords[0]);
	    const title = data.features[i].properties.place;
	    const url = data.features[i].properties.url;
	    var marker = new google.maps.Marker({
		position: position,
		map: map,
		title: title,
		url: url,
	    });
	    google.maps.event.addListener(marker, 'click', function() {
		window.open(marker.url)
	    });
	}
	navigator.geolocation.getCurrentPosition(function(position) {
	    const center = new google.maps.LatLng(
	    	position.coords.latitude, position.coords.longitude);
	    map.setCenter(center);
	    map.setZoom(6);
	});
    });
}
