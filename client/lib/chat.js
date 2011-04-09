$(document).ready(function(){
	
	function sendMessage() {
		now.distributeMessage($("#text-input").val());
		$("#text-input").val("");
		$("#text-input").focus();
	}
  
	now.name = prompt("What's your name?", "");
	now.colour = '#'+Math.floor(Math.random()*16777215).toString(16);
	
	now.receiveMessage = function(name, colour, message){
		$("#messages").append("<br>" + '<span style="color:' + colour + ';">' + name + "</span>" + ": " + message);
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
});