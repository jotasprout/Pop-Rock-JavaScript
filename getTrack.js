// get track info

$(document).ready(function(){

	// create variable for url
	var trackURL = "https://api.spotify.com/v1/tracks/1BruCWLTdR95vy0DIQkEFy";

	// use variable to get the info
	$.getJSON(trackURL, function(json){
		var trackName = json.name;
		var trackPop = json.popularity;
		var trackAlbum = json.album.name;
		var trackArtist = json.artists[0].name;
		console.log(trackName + ' = ' + trackPop + ' = ' + trackAlbum + ' = ' + trackArtist);
		// console.log(json);
	});
});