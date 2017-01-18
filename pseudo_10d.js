/*
Get artistID
-- Build artistURL using artistID
-- Use artistURL to get popularity of artist
-- Build artistAlbums URL using artistID
-- Use artistAlbums URL to get albumID of each album
-- Put each albumID into artistAlbums array
-- Build each albumURL using each albumID
-- Use albumURL to get releaseDate of each album
-- Use albumURL to get popularity of each album
-- Build albumTracksURL using each albumID
-- Use albumTracksURL to get each trackID
-- Put each trackID into albumTracks array
-- Build trackURL for each track using trackID
-- Use trackURL to get name of each track
-- Use trackURL to get popularity of each track
*/

$(document).ready(function(){
  // base of request URL
  var apiurl = "https://api.spotify.com";

  // Declare all variables as global so I can assign and access anywhere
  // Figure out how and where to put these since, apparently, global vars are bad and not working how I want anyway
  var artistID;
  var artistURL;
  var artistName;
  var artistPop;
  var artistAlbumsURL;
  var artistAlbums = [];
  var artistAlbumsStr;
  var albumArray;
  var albumsArrays = [];
  var severalAlbumsURL;

  // Alice Cooper artistID for dev and testing
  artistID = "3EhbVgyfGd7HkpsagwL9GS";
  // "Flush the Fashion" albumID for dev and testing
  albumID = "2tivwwko3vqzzICWw3G9oB";

  var albumID;
  var albumName;
  var albumReleased;
  var albumPop;
  var albumTracks = [];
  var trackID;
  var trackName;
  var trackPop;

  var albumTracks = [];
  var albumsTracksArrays = [];
  var albumTracksURL;

  function build_artistURL (artistID) {
    artistURL = apiurl + "/v1/artists/" + artistID;
  }

  function requestArtistInfo(artistURL){
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
    $.getJSON(artistAlbumsURL, function(json){
      $.each(json.items, function (key, val){
        albumID = val.id;
        artistAlbums.push(albumID);
      });
  	  divideCombineAlbums (artistAlbums);
	  getAllAlbums(albumsArrays);
    });
  }

  function getAllAlbums(albumsArrays){
	  for (i=0; i<(albumsArrays.length); i++){
        var artistAlbumsStr = albumsArrays[i].join();
        build_severalAlbumsURL (artistAlbumsStr);
        getSeveralAlbums (severalAlbumsURL);
      };
  }

	function divideCombineAlbums(artistAlbums){
	  var artistAlbumsChunk;
	  var x = Math.ceil((artistAlbums.length)/20);
	  var firstAlbum = 0;
	  for (i=0; i<x; i++){
		var lastAlbum = firstAlbum + 19;
		artistAlbumsChunk = artistAlbums.slice(firstAlbum, lastAlbum);
		albumsArrays.push(artistAlbumsChunk);
		firstAlbum += 19;
	  };
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
				$.each(album.tracks.items, function (trackIndex, track){
					trackID = track.id;
					albumTracks.push(trackID);
				});
			});
			divideCombineAlbumTracks (albumTracks);
			getAllTracks();
      // empty the arrays so getAllTracks doesn't grab anything twice
      emptyTracks ();
		});
	}

	function divideCombineAlbumTracks (albumTracks){
		var albumTracksChunk;
		var y = Math.ceil((albumTracks.length)/50);
		var firstTrack = 0;
		for (i=0; i<y; i++){
			var lastTrack = firstTrack + 49;
			albumTracksChunk = albumTracks.slice(firstTrack, lastTrack);
			albumsTracksArrays.push(albumTracksChunk);
			firstTrack += 49;
		};
	}

	function build_albumTracksURL () {
	  var albumToGet = albumsTracksArrays[i].join();
	  albumTracksURL = apiurl + "/v1/tracks?ids=" + albumToGet + "&market=US";
	}

	function getSeveralTracks (albumTracksURL) {
	  $.getJSON(albumTracksURL, function(json){
		$.each(json.tracks, function (trackIndex, track){
			trackName = track.name;
			trackPop = track.popularity;
			var trackAlbumName = track.album.name;
			console.log(trackAlbumName + ' = ' + trackName + ' = ' + trackPop);
		});
	  });
	}

  function getAllTracks(){
    for (i=0; i < albumsTracksArrays.length; i++){
      build_albumTracksURL ();
      getSeveralTracks (albumTracksURL);
    };
  }

  function emptyTracks (){
	  albumTracks = [];
    albumsTracksArrays = [];
	}


  build_artistURL (artistID)
  requestArtistInfo(artistURL);
  build_artistAlbumsURL(artistID);
  getArtistAlbums (artistAlbumsURL);

});
