/*
Get artistID
-- Build artistURL using artistID
-- Use artistURL to get popularity of artist
-- Build artistAlbums URL using artistID
-- Use artistAlbums URL to get albumID of each album
Put each albumID into artistAlbums array
-- Build each albumURL using each albumID
-- Use albumURL to get releaseDate of each album
-- Use albumURL to get popularity of each album
-- Build albumTracksURL using each albumID
-- Use albumTracksURL to get each trackID
Put each trackID into albumTracks array
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
  var artistAlbums = [];
  var artistAlbums1 = [];
  var artistAlbums2 = [];
  var artistAlbums1str;
  var artistAlbums2str;
  var albumArray;
  var albumsArrays = [];
  var severalAlbumsURL;

  // Alice Cooper artistID for dev and testing
  artistID = "3EhbVgyfGd7HkpsagwL9GS";
  // "Flush the Fashion" albumID for dev and testing
  albumID = "2tivwwko3vqzzICWw3G9oB";

  var albumID;
  // var albumURL;
  var albumName;
  var albumReleased;
  var albumPop;
  // var albumTracksURL;
  var albumTracks = [];
  var trackID;
  // var trackURL;
  var trackName;
  var trackPop;

  var blah;

  function build_artistURL (artistID) {
    artistURL = apiurl + "/v1/artists/" + artistID;
    // console.log(artistURL);
  }

	function getArtist(artistURL){
    $.getJSON(artistURL, function(json){
      artistName = json.name;
      artistPop = json.popularity;
      console.log(artistName + ' = ' + artistPop);
    });
  }

  function build_artistAlbumsURL (artistID) {
    artistAlbumsURL = apiurl + "/v1/artists/" + artistID + "/albums?offset=0&limit=50&album_type=album&market=US";
  }

  function getArtistAlbums (artistAlbumsURL){
    console.log(artistAlbumsURL);
    $.getJSON(artistAlbumsURL, function(json){
      $.each(json.items, function (key, val){
        albumID = val.id;
        // albumName = val.name;
        // console.log(albumName + ' = ' + albumID);
        artistAlbums.push(albumID);
      });
	  divideCombineAlbums (artistAlbums);
	  artistAlbums2str = artistAlbums2.join();
	  artistAlbums1str = artistAlbums1.join();
	  // console.log(artistAlbums);
	  // console.log(artistAlbums1str);
	  // console.log(artistAlbums2str);
	  build_severalAlbumsURL (artistAlbums1str);
	  // console.log(severalAlbumsURL);
	  getSeveralAlbums (severalAlbumsURL);
    });
  }

	function divideCombineAlbums (artistAlbums){
		artistAlbums1 = artistAlbums.slice(0,19);
		albumsArrays.push(artistAlbums1);
		artistAlbums2 = artistAlbums.slice(19);
		albumsArrays.push(artistAlbums2);
	}

  function build_severalAlbumsURL (albumsString) {
    severalAlbumsURL = apiurl + "/v1/albums?ids=" + albumsString + "&market=US";
  }

  function getSeveralAlbums (severalAlbumsURL) {
    $.getJSON(severalAlbumsURL, function(json){
      $.each(json.albums, function (albumIndex, album){
        albumName = album.name;
  		  albumPop = album.popularity;
  		  albumReleased = album.release_date;
  		  console.log(albumName + ' = ' + albumPop + ' = ' + albumReleased);
      // I've tried with "track" and with "item" on line 114
      $.each(album.tracks.items, function (trackIndex, track){
			  trackID = track.id;
			  trackName = track.name;
			  console.log(trackName + ' = ' + trackID);
			  albumTracks.push(trackName);
		  });
		  // console.log(albumTracks);
    });
    console.log(albumTracks);
  });
}

  /*
  function getSeveralArrays(albumsArrays){
	  for (i=0; i <= albumsArrays.length; i++){
		 albumArray = albumsArrays[i];
		 build_severalAlbumsURL(albumArray);
		 getSeveralAlbums(severalAlbumsURL);
	  };
  }
*/

  build_artistURL (artistID)
  getArtist(artistURL);
  build_artistAlbumsURL(artistID);
  getArtistAlbums (artistAlbumsURL);
  // build_severalAlbumsURL(artistAlbums1);
  // getSeveralAlbums (severalAlbumsURL);
});

/*

  function build_albumURL (albumID) {
    albumURL = apiurl + "/v1/albums/" + albumID;
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

 */
