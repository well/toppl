$(document).ready(function() {
	now.setCurrentLocation = function(venue) {
		$("#current_location_name").html(venue.name);
	}

	now.setNextVenues = function(venues) {
		$("#bar-choice-0").html(venues[0].name);
	}

	for(var i=0; i<5; i++) {
		$("#bar-choice-" + i).click(function() {
			alert($(this).attr("value") + " was clicked!");
			now.vote($(this).attr("value"));
		});
	}
	
	now.receiveVote = function() {
		for(var i in now.bars) {
			var bar = now.bars[i];
			$("#vote-results").append(bar + "<br/>");
		}
	}
});
