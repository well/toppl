var toppllocations = {};

$(document).ready(function(){
	$("#map").click(function () {
		updatelocations(toppllocations);
	});
	
	function sendMessage() {
		setGeolocation();
		now.distributeMessage($("#text-input").val());
		$("#text-input").val("");
		$("#text-input").focus();
	}

	function setGeolocation() {
		if( navigator.geolocation ) {
			// Call getCurrentPosition with success and failure callbacks
			navigator.geolocation.getCurrentPosition( geolocatesuccess, geolocatefail );
		} else {
			alert("Sorry, your browser does not support geolocation services.");
		}
	}

	function geolocatesuccess(position) {
		// GeoPosition Object
//		alert("Your coordinates are " + position.coords.latitude + ", " + position.coords.longitude);
		now.location = position;
	}

	function geolocatefail() {
		// Could not obtain location
	}

	function updatelocations(locations) {
		google_maps_img_string = "http://maps.google.com/maps/api/staticmap?zoom=14&size=512x512&maptype=roadmap";
// "&markers=color:blue|label:S|40.702147,-74.015794" +
// "&markers=color:green|label:G|40.711614,-74.012318" +
// "&markers=color:red|color:red|label:C|40.718217,-73.998284" +

		for(var i in locations) {
			google_maps_img_string += "&markers=label:" + i + "|" + locations[i].coords.latitude + "," + locations[i].coords.longitude;
		}	
		google_maps_img_string += "&sensor=false";
		
		document.getElementById('map_canvas').innerHTML = "<img src="+google_maps_img_string+"></img>";
	}
	
	now.name = prompt("What's your name?", "");
	now.colour = '#'+Math.floor(Math.random()*16777215).toString(16);

	now.receiveMessage = function(name, colour, message, locations){
		if (colour == now.colour) {
			$("#messages").append("" + '<p class="triangle-border left" style="color:' + colour + ';">' + name + "</span>" + ": " + message);
			toppllocations = locations;
		} else {
			$("#messages").append("" + '<p class="triangle-border right" style="color:' + colour + ';">' + name + "</span>" + ": " + message);
			toppllocations = locations;
		}
	}
	  
	$("#send-button").click(function(){
		sendMessage();
	});
	
	$("#text-input").bind('keyup', function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) { //Enter keycode
			sendMessage();
		}
	});
	
	function drawMap(locations) {
		var myLatLng = new google.maps.LatLng(0, -180);
		var myOptions = {
			zoom: 3,
			center: myLatLng,
			mapTypeId: google.maps.MapTypeId.SATELLITE
		};

		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

		for(var i in locations) {
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i].coords.lattitude, locations[i].coords.longitude), 
				map: map, 
				title:locations[i]
			});
		}

		var toppl_user_history_coordinates = [
			new google.maps.LatLng(37.772323, -122.214897),
			new google.maps.LatLng(21.291982, -157.821856),
			new google.maps.LatLng(-18.142599, 178.431),
			new google.maps.LatLng(-27.46758, 153.027892)
		];

		var user_history_path = new google.maps.Polyline({
			path: toppl_user_history_coordinates,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 2
		});

		user_history_path.setMap(map);
		google.maps.event.trigger(map,'resize');
	}
});

