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
  // base of request URL
  var apiurl = "https://api.spotify.com";

  // "Talk Talk" trackID for dev and testing -- worked -- commenting out for now
  // Will use & test getAlbumTracks to get trackID for all album tracks
  // talkTalk = "1BruCWLTdR95vy0DIQkEFy";

  // Declare all variables as global so I can assign and access anywhere
  var artistID;
  var artistURL;
  var artistName;
  var artistPop;

  // "Flush the Fashion" albumID for dev and testing
  // If this version fails, check this albumID is correct
  flushFashion = "2tivwwko3vqzzICWw3G9oB";

  var albumID;
  var albumURL;
  var albumName;
  var albumReleased;
  var albumPop;

  var albumTracksURL;
  // using string for testing
  // If this version fails, check this is correct
  albumTracksURL = "https://api.spotify.com/v1/albums/2tivwwko3vqzzICWw3G9oB/tracks?offset=0&limit=20&market=US";

  var trackID;
  var trackURL;
  var trackName;
  var trackPop;

  /* Wait. Don't use this yet. Use string first to test getAlbumTracks
  function build_albumTracksURL (albumID) {
    albumTracksURL = apiurl + "/v1/albums/" + albumID + "?market=US";
  }
  */

  /* this works but I want to build newer, shorter version with getJSON
  function getAlbumTracks (albumTracksURL) {
    $.ajax({
      url: "https://api.spotify.com/v1/albums/2tivwwko3vqzzICWw3G9oB/tracks?limit=20&market=US",
      dataType: 'json',
      success: function(results){
        $.each(results.items, function (key, val){;
          // store id in variable
          var trackID = val.id;
          // build url with id (includes printing trackURL in console)
          build_track_url(trackID);
          console.log(trackURL);
          // use url to get track
          getTrack(trackURL);
        })
      }
    })
  }
  */


  function getAlbumTracks (albumTracksURL) {
    $.getJSON(albumTracksURL, function(json){
        $.each(json.items, function (key, val){
          // store id in variable
          var trackID = val.id;
          // build url with id (includes printing trackURL in console)
          build_track_url(trackID);
          console.log(trackURL);
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
      var trackName = json.name;
      var trackPop = json.popularity;
      var trackAlbum = json.album.name;
      var trackArtist = json.artists[0].name;
      console.log(trackName + ' = ' + trackPop + ' = ' + trackAlbum + ' = ' + trackArtist);
      // console.log(json);
    });
  }

  // build albumTracksURL using albumID when ready
  // build_albumTracksURL (flushFashion);

  // get album tracks using string for URL
  getAlbumTracks(albumTracksURL);

  // build trackURL using trackID
  // is getAlbumTracks doing this by itself? commenting out to confirm
  // build_track_url(trackID);

  // get track info
  // is getAlbumTracks doing this by itself? commenting out to confirm
  // getTrack (trackURL);

});
