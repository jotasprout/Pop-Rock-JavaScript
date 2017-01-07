// get track info

$(document).ready(function(){

	// create variable for url
	var albumURL = "https://api.spotify.com/v1/albums/2tivwwko3vqzzICWw3G9oB";

	// use variable to get the info
	$.getJSON(albumURL, function(json){
		var albumName = json.name;
		var albumPop = json.popularity;
		var albumReleased = json.release_date;
		console.log(albumName + ' = ' + albumPop + ' = ' + albumReleased);
	});
});