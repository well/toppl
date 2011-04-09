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
		
		var totalVotes = 0;
		var highestVote = 0;
		
		var votes = new Array();
		
		var chartVals = "";
		
		for(var i in venues) {
			$("#venue-choices").append('<a id="venue-' + i +
			   '" value="' + i +
			   '"href="#" data-icon="arrow-u" data-theme="a" class="ui-btn ui-btn-icon-left ui-btn-corner-all ui-shadow ui-btn-up-a">' +
									'<span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">' + '' + venues[i].name + '</span><span class="ui-icon ui-icon-arrow-u ui-icon-shadow"></span></span></a>' +
									   '<center> Current Votes: ' + venues[i].votes +
									   '</center><br/>');
			totalVotes += venues[i].votes;
			
			if(venues[i].votes > highestVote) {
				highestVote = venues[i].votes;
			}
			
			chartVals += (venues[i].votes + "|"); 
		}
		
		chartVals = chartVals.substring(0, chartVals.length - 1);
		$("#vote-results").html("");
		$("#vote-results").html('<img src="http://chart.apis.google.com/chart?chxr=0,0,' + highestVote + '?chxt=y&chbh=a&chs=300x225&cht=bvg&chco=A2C180,3D7930&chd=t:' + chartVals + '" width="300" height="225" />');
		
		bindVotes();
	}

	$("#toppl_button").click(function() {
		now.doToppl();
	});
});
