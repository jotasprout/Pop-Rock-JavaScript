// So far, all this version does is
// get an album's tracks
// for each track, builds (and shows in console) a URL for getting that track

$(document).ready(function(){

	// Should I create custom named functions for each request with this type of AJAX function inside?
	$.ajax({
		url: "https://api.spotify.com/v1/albums/2tivwwko3vqzzICWw3G9oB/tracks?limit=20&market=US",
		dataType: 'json',
		success: function(results){
			$.each(results.items, function (key, val){
				// Line 13 worked just fine in version 1
				// console.log(val.name + ' = ' + val.id);
				// store id in variable
				var trackID = val.id;
				// store name in variable?
				// build url with id (includes printing trackURL in console)
				build_track_url(trackID);
				// trackURL variable works in and out of function
				console.log(trackURL);
				// BELOW IS UNTESTED
				// use url to get track
				getTrack(trackURL);
				// console name and popularity

			})
		}
	});
});

// build_track_url WORKS!
function build_track_url(trackID) {
	trackURL = apiurl + "/v1/tracks/" + trackID + "?market=US";
	// for testing
	// moving line 33 outside function to see where I have to put trackURL variable
	// console.log(trackURL);
}

// Testing in progress
function getTrack (trackURL) {
	// use variable to get the info
	$.getJSON(trackURL, function(json){
		var trackName = json.name;
		var trackPop = json.popularity;
		var trackAlbum = json.album.name;
		var trackArtist = json.artists[0].name;
		console.log(trackName + ' = ' + trackPop + ' = ' + trackAlbum + ' = ' + trackArtist);
	});
}

// base of request URL
var apiurl = "https://api.spotify.com";

function build_artist_albums_url(rockstar) {
	artistAlbumsURL = apiurl;
	artistAlbumsURL += "/v1/artists/";
	// add artist ID
	artistAlbumsURL += rockstar;
	// GET artist's albums
	artistAlbumsURL += "/albums";
	// add USA market
	artistAlbumsURL += "?market=US";
	// type is album as opposed to single, etc
	artistAlbumsURL += "&album_type=album";
	// limit to 50 because geez there's a lot of compilations and stuff in no kind of order
	artistAlbumsURL += "&limit=50";
}



// Functions for creating objects
// Will I really need these?

function album (id, name, popularity, releaseDate) {
	this.id = id;
	this.name = name;
	this.popularity = popularity;
	this.releaseDate = releaseDate;
}

function artist (id, name, popularity) {
	this.id = id;
	this.name = name;
	this.popularity = popularity;
}

// hopefully in future version of function below, will use IDs to get artistName, albumName, and releaseDate
function track (id, name, popularity, artistName, artistid, albumName, albumid) {
	this.id = id;
	this.name = name;
	this.popularity = popularity;
	this.artistName = artistName;
	this.artistid = artistid;
	this.albumName = albumName;
	this.albumid = albumid;
}
