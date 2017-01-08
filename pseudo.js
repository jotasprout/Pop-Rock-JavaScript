/*
Get artistID
Build artistURL using artistID
Use artistURL to get popularity of artist
Build artistAlbums URL using artistID
Use artistAlbums URL to get albumID of each album
Build each albumURL using each albumID
Use albumURL to get releaseDate of each album
Use albumURL to get popularity of each album
Build albumTracksURL using each albumID
Use albumTracksURL to get each trackID
Build trackURL for each track using trackID
Use trackURL to get name of each track
Use trackURL to get popularity of each track
*/

$(document).ready(function(){

  var artistID;
  var artistURL;
  var artistName;
  var artistPop;

  var albumID;
  var albumURL;
  var albumName;
  var albumReleased;
  var albumPop;

  var trackID;
  var trackURL;
  var trackName;
  var trackPop;

  function build_artistURL (artistID) {
    // use artistID to build artistURL
  }

  function build_trackURL (trackID) {
    // use trackID from albumTracks to build trackURL
  }

  trackURL = "https://api.spotify.com/v1/tracks/1BruCWLTdR95vy0DIQkEFy";

  function getTrack (trackURL) {
    // use variable to get the info
    $.getJSON(trackURL, function(json){
      var trackName = json.name;
      var trackPop = json.popularity;
      var trackAlbum = json.album.name;
      var trackArtist = json.artists[0].name;
      console.log(trackName + ' = ' + trackPop + ' = ' + trackAlbum + ' = ' + trackArtist);
      // console.log(json);
    });
  }

  getTrack (trackURL);

  // get track info

	// create variable for url

});
