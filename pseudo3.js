/*
Get artistID
Build artistURL using artistID
-- Use artistURL to get popularity of artist
Build artistAlbums URL using artistID
Use artistAlbums URL to get albumID of each album
Build each albumURL using each albumID
Use albumURL to get releaseDate of each album
Use albumURL to get popularity of each album
Build albumTracksURL using each albumID
-- Use albumTracksURL to get each trackID
-- Build trackURL for each track using trackID
-- Use trackURL to get name of each track
-- Use trackURL to get popularity of each track
*/

$(document).ready(function(){
  // base of request URL
  var apiurl = "https://api.spotify.com";

  // Declare all variables as global so I can assign and access anywhere
  var artistID;
  var artistURL;
  var artistName;
  var artistPop;

  var artistAlbumsURL;

  // Alice Cooper artistID for dev and testing
  artistID = "3EhbVgyfGd7HkpsagwL9GS";

  var albumID;
  var albumURL;
  var albumName;
  var albumReleased;
  var albumPop;

  // "Flush the Fashion" albumID for dev and testing
  albumID = "2tivwwko3vqzzICWw3G9oB";

  var albumTracksURL;

  var trackID;
  var trackURL;
  var trackName;
  var trackPop;

  var artistURL;
  // string for testing until I write function for getArtist
	// artistURL = "https://api.spotify.com/v1/artists/3EhbVgyfGd7HkpsagwL9GS";

  function build_artistURL (artistID) {
    artistURL = apiurl + "/v1/artists/" + artistID;
    console.log(artistURL);
  }

	function getArtist(artistURL){
    $.getJSON(artistURL, function(json){
      artistName = json.name;
      artistPop = json.popularity;
      console.log(artistName + ' = ' + artistPop);
    });
  }

  function build_artistAlbumsURL (artistID) {
    artistAlbumsURL = apiurl + "/v1/artists/" + artistID + "/albums?offset=0&limit=50&album_type=album";
  }

  function getArtistAlbums (artistAlbumsURL){
    // console.log(artistAlbumsURL);
    $.getJSON(artistAlbumsURL, function(json){
      $.each(json.items, function (key, val){
        albumID = val.id;
        // albumName = val.name;
        // console.log(albumName + ' = ' + albumID);
        build_albumURL (albumID);
        getAlbum (albumURL);
        build_albumTracksURL (albumID);
        getAlbumTracks (albumTracksURL);
      });
    });
  }

  function build_albumURL (albumID) {
    albumURL = apiurl + "/v1/albums/" + albumID;
  }

	function getAlbum (albumURL) {
  	$.getJSON(albumURL, function(json){
  		var albumName = json.name;
  		var albumPop = json.popularity;
  		var albumReleased = json.release_date;
  		console.log(albumName + ' = ' + albumPop + ' = ' + albumReleased);
    });
	}

  function build_albumTracksURL (albumID) {
    albumTracksURL = apiurl + "/v1/albums/" + albumID + "/tracks?offset=0&limit=20&market=US";
  }

  function getAlbumTracks (albumTracksURL) {
    $.getJSON(albumTracksURL, function(json){
      $.each(json.items, function (key, val){
        // store id in variable
        trackID = val.id;
        // build url with id
        build_track_url(trackID);
        // use url to get track
        getTrack(trackURL);
      });
    });
  }

  function build_track_url(trackID) {
  	trackURL = apiurl + "/v1/tracks/" + trackID + "?market=US";
  }

  function getTrack (trackURL) {
    // use variable to get the info
    $.getJSON(trackURL, function(json){
      trackName = json.name;
      trackPop = json.popularity;
      trackAlbum = json.album.name;
      trackArtist = json.artists[0].name;
      console.log(trackName + ' = ' + trackPop + ' = ' + trackAlbum + ' = ' + trackArtist);
    });
  }

  build_artistURL (artistID)
  getArtist(artistURL);
  build_artistAlbumsURL(artistID);
  getArtistAlbums (artistAlbumsURL)
});
