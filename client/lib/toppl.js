$(document).ready(function() {
	for(var i=0; i<5; i++) {
		$("#bar-choice-" + i).click(function() {
			alert($(this).attr("value") + " was clicked!");
			now.vote($(this).attr("value"));
		});
	}
	
	now.receiveVote = function(bars) {
		var bars = JSON.parse(bars);
		for(var i in bars) {
			var bar = bars[i];
			$("#vote-results").append(bar.bar + " count: " + bar. "<br/>");
		}
	}
});