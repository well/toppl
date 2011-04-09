// YellowAPI info
var APIHOST = "api.sandbox.yellowapi.com";
var APIKEY = "zy33cw38dgg6js6eg6hrfxkj";
var API_KEYWORD = "bar"; 			// this is the string that is used to search
var NUM_NEXT_VENUE_OPTIONS = 5;

// init data
var currentVenue;
var nextVenues;

// set the starting point to PostRank
currentVenue = {
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

everyone.connected(function(){
      console.log("Joined: " + this.now.name);
	everyone.now.setCurrentLocation(currentVenue);
	everyone.now.setNextVenues(nextVenues);
});


everyone.disconnected(function(){
      console.log("Left: " + this.now.name);
});

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, this.now.colour, message);
};

everyone.now.vote = function(id) {
	console.log("Voted: " + id);
	nextVenues[id].votes++;
	everyone.now.setNextVenues(nextVenues);
}

// pass this the ID of the new venue
everyone.now.doToppl = function() {
	// which venue is in the lead?
	newVenue = -1;
	maxVotes = 0;
	for(var i in nextVenues) {
		if (nextVenues[i].votes > maxVotes) {
			maxVotes = nextVenues[i].votes;
			newVenue = i;
		}
	}

	// This should always be true?
	if (newVenue >= 0) {
		currentVenue = nextVenues[newVenue];
		everyone.now.setCurrentLocation(currentVenue);
		console.log("TOPPL! New venue is " + currentVenue.name);

		getNextVenues(currentVenue);
		console.log(currentVenue.name);
	}
};

function pushNewVenues (nextVenues) {
	// update the options for the next venues
	console.log("New venue options:");
	for(var i in nextVenues) {
		console.log(nextVenues[i].name);
	}
	everyone.now.setNextVenues(nextVenues);
}

// Yellow API code
// temp fake result data in case I don't want to call the Yellow API
var fake_result_data = '{"summary":{"what":"bar","where":"cZ-80.524378,43.464745","latitude":"43.464745","longitude":"-80.524378","firstListing":1,"lastListing":5,"totalListings":5876,"pageCount":1176,"currentPage":1,"listingsPerPage":5},"listings":[{"parentId":"","isParent":false,"distance":"0.0","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":false,"inMkt":false},"Logo":{"avail":false,"inMkt":false}},"id":"532082","name":"Duke Of Wellington The","address":{"street":"33 Erb St W","city":"Waterloo","prov":"ON","pcode":"N2L1S8"},"geoCode":{"latitude":"43.464745","longitude":"-80.524378"}},{"parentId":"","isParent":false,"distance":"0.3","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":true,"inMkt":true},"Logo":{"avail":false,"inMkt":false}},"id":"1041135","name":"McMullans On King","address":{"street":"56 King N","city":"Waterloo","prov":"ON","pcode":"N2J2X1"},"geoCode":{"latitude":"43.467032","longitude":"-80.522958"}},{"parentId":"","isParent":false,"distance":"0.4","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":false,"inMkt":false},"Logo":{"avail":false,"inMkt":false}},"id":"606766","name":"Failte Irish Pub","address":{"street":"85 King N","city":"Waterloo","prov":"ON","pcode":"N2J2X3"},"geoCode":{"latitude":"43.468002","longitude":"-80.523176"}},{"parentId":"","isParent":false,"distance":"1.4","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":true,"inMkt":true},"Logo":{"avail":false,"inMkt":false}},"id":"1088388","name":"Morty\'s Pub","address":{"street":"272 King N","city":"Waterloo","prov":"ON","pcode":"N2J2Y9"},"geoCode":{"latitude":"43.477115","longitude":"-80.52517"}},{"parentId":"","isParent":false,"distance":"2.8","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":false,"inMkt":false},"Logo":{"avail":false,"inMkt":false}},"id":"649696","name":"Frankies Pub","address":{"street":"273 King W","city":"Kitchener","prov":"ON","pcode":"N2G1B1"},"geoCode":{"latitude":"43.451568","longitude":"-80.494121"}}]}';

var receivedAPIData = "";

function getNextVenues(currentVenue) {
	var locx = currentVenue.geoCode.longitude;
	var locy = currentVenue.geoCode.latitude;

	var UID = "127.0.0.1"; // I am not sure what this is
	var params = "?what=" + API_KEYWORD + "&where=cZ" + locx + "," + locy + "&pgLen=" + NUM_NEXT_VENUE_OPTIONS + "&fmt=json&apikey=" + APIKEY + "&UID=" + UID;
	//var yellowapi_url = APIHOST + "FindBusiness/" + params;

	// fake test data!
	//json_data = fake_result_data;

	// Call the YellowAPI
	    receivedAPIData = "";	  
	var http = require('http');
	var host = http.createClient(80, APIHOST);
	var request = host.request('GET', '/FindBusiness/' + params, {'host': APIHOST});
	request.end();
	request.on('response', function (response) {
	  console.log('STATUS: ' + response.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(response.headers));
	  response.setEncoding('utf8');
	  response.on('data', function (chunk) {
	    receivedAPIData += chunk
	  });
	  response.on('end', function() {
	    console.log('BODY: ' + receivedAPIData);
		console.log('----');
		yellowAPIResults = JSON.parse(receivedAPIData);
		var venues = yellowAPIResults.listings;
		for(var i in venues) {
				venues[i].votes = 0;
		}
		nextVenues = venues;
		pushNewVenues(nextVenues);

		    // reset
		    receivedAPIData = "";	  
	  });
	});
}

getNextVenues(currentVenue);
