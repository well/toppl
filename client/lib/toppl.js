$(document).ready(function() {
	now.setCurrentLocation = function(venue) {
		$("#current_location_name").html(venue.name);
	}

	function bindVotes() {
		for(var i=0; i<5; i++) {
			$("#venue-" + i).click(function() {
				now.vote($(this).attr("value"));
			});
		}
	}

	now.setNextVenues = function(venues) {
		$("#bar-choice-0").html(venues[0].name);
		$("#venue-choices").html("");
		for(var i in venues) {
			$("#venue-choices").append('<a href="#" id="venue-' + i +
									   '" value="' + i +
									   '">Vote ' + venues[i].name + '</a>' +
									   ' Current Votes: ' + venues[i].votes +
									   '<br/>');
		}
		bindVotes();
	}

	$("#toppl_button").click(function() {
		now.doToppl();
	});

});
