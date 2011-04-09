var express = require('express');

var app = express.createServer();

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.configure( function(){
	app.use(express.static(__dirname + '/../client'));
});


// Routes

app.get('/', function(req, res){
  res.render('index', {locals: {
    title: 'NowJS + Express Example'
  }});
});


app.listen(8080);
console.log("Express server listening on port %d", app.address().port);


// NowJS component

var everyone = require("now").initialize(app);

var bars = new Array();
bars["Ethel's"] = 0;
bars["Jane Bond"] = 0;
bars["Starlight"] = 0;
bars["McMullan's"] = 0;
bars["Chainsaw"] = 0;

everyone.now.bars = bars;

everyone.connected(function(){
      console.log("Joined: " + this.now.name);
});


everyone.disconnected(function(){
      console.log("Left: " + this.now.name);
});

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, this.now.colour, message);
};

everyone.now.vote = function(bar) {
	everyone.now.bars[bar]++;
	everyone.now.receiveVote();
}

everyone.now.doToppl = function(newVenue) {
	currentVenue = newVenue;
	everyone.now.setNewVenue(newVenue);
};

var currentVenue;

// set the starting point to PostRank
var currentVenue = {
	name: "Starting point",
	address:{
		street: "180 King St S",
		city: "Waterloo",
		prov:"ON",
		pcode:"N2J2X3"
	},
	geoCode:{
		latitude:"43.468002",
		longitude:"-80.523176"
	}
};
