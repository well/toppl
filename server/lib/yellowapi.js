/* yellowapi.js
 * 
 * Wrappers for accessing local Yellow API information.
 */

var APIHOST = "http://api.sandbox.yellowapi.com/";
var APIKEY = "zy33cw38dgg6js6eg6hrfxkj";

var fake_result_data = '{"summary":{"what":"bar","where":"cZ-80.524378,43.464745","latitude":"43.464745","longitude":"-80.524378","firstListing":1,"lastListing":5,"totalListings":5876,"pageCount":1176,"currentPage":1,"listingsPerPage":5},"listings":[{"parentId":"","isParent":false,"distance":"0.0","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":false,"inMkt":false},"Logo":{"avail":false,"inMkt":false}},"id":"532082","name":"Duke Of Wellington The","address":{"street":"33 Erb St W","city":"Waterloo","prov":"ON","pcode":"N2L1S8"},"geoCode":{"latitude":"43.464745","longitude":"-80.524378"}},{"parentId":"","isParent":false,"distance":"0.3","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":true,"inMkt":true},"Logo":{"avail":false,"inMkt":false}},"id":"1041135","name":"McMullans On King","address":{"street":"56 King N","city":"Waterloo","prov":"ON","pcode":"N2J2X1"},"geoCode":{"latitude":"43.467032","longitude":"-80.522958"}},{"parentId":"","isParent":false,"distance":"0.4","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":false,"inMkt":false},"Logo":{"avail":false,"inMkt":false}},"id":"606766","name":"Failte Irish Pub","address":{"street":"85 King N","city":"Waterloo","prov":"ON","pcode":"N2J2X3"},"geoCode":{"latitude":"43.468002","longitude":"-80.523176"}},{"parentId":"","isParent":false,"distance":"1.4","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":true,"inMkt":true},"Logo":{"avail":false,"inMkt":false}},"id":"1088388","name":"Morty\'s Pub","address":{"street":"272 King N","city":"Waterloo","prov":"ON","pcode":"N2J2Y9"},"geoCode":{"latitude":"43.477115","longitude":"-80.52517"}},{"parentId":"","isParent":false,"distance":"2.8","content":{"Video":{"avail":false,"inMkt":false},"Photo":{"avail":false,"inMkt":false},"Profile":{"avail":false,"inMkt":false},"DspAd":{"avail":false,"inMkt":false},"Url":{"avail":false,"inMkt":false},"Logo":{"avail":false,"inMkt":false}},"id":"649696","name":"Frankies Pub","address":{"street":"273 King W","city":"Kitchener","prov":"ON","pcode":"N2G1B1"},"geoCode":{"latitude":"43.451568","longitude":"-80.494121"}}]}';

function getLocations(keyword, locx, locy, num_results) {
	var UID = "127.0.0.1"; // I am not sure what this is
	var url = APIHOST + "FindBusiness/?what=" + keyword + "&where=cZ" + locx + "," + locy + "&pgLen=" + num_results + "&fmt=json&apikey=" + APIKEY + "&UID=" + UID;

	// Call the YellowAPI
	// json_data = "";
	// fake test data!
	json_data = fake_result_data;

	return JSON.parse(fake_result_data);

	return results.listings;
}
