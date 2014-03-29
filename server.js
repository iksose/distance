var gm = require('googlemaps');
var util = require('util');
var fs = require('fs');


// var addresses = require('./addresses')
// for(var i=0; i < addresses.length; i++){
// 	gm.geocode(addresses[i], function(err, data){
// 		var lat =  data.results[0].geometry.location.lat;
// 		var lng = data.results[0].geometry.location.lng;
// 		var address = data.results[0].formatted_address;
// 		var formObj = {
// 			address: address,
// 			lat: lat,
// 			lng: lng
// 		}
// 		fs.appendFile("./latlng.js", JSON.stringify(formObj, null, 4) + ", \n",  function(err){
// 			if(err) throw err;
// 			console.log("It saved!")
// 		})
// 	});
// };


var latlng = require('./latlng')
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

var latlng_length = latlng.length;
for (var i = 0; i < latlng_length; i++) {
	var lat1 = latlng[i].lat;
	var lng1 = latlng[i].lng;
	var addr1 = latlng[i].address.substring(0,20);
	var distances = [];
	for (var i2 = i+1; i2 < latlng_length; i2++) {
		var lat2 = latlng[i2].lat;
		var lng2 = latlng[i2].lng;
		var addr2 = latlng[i2].address.substring(0,20);
		var calc = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2)
		// console.log(calc, addr1, addr2)

		var myObj = {
			name: addr2,
			distance: calc
		}

		// distances.push(calc)
		distances.push(myObj)
	};
	// console.log(addr1 + "has " + distances)
	var closest = distances.sort(function(a,b){return a.distance - b.distance})[0]

	if(closest){//make sure it's not undefined last one
		console.log(addr1 + " - closest is - " + closest.distance + " - " + closest.name)
		// console.log(closest)
	}
};
