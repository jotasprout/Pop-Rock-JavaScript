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
  var albumName;
  var albumReleased;
  var albumPop;
  var albumTracks = [];
  var trackID;
  var trackName;
  var trackPop;

  var albumTracks = [];
  var albumTracks1;
  var albumTracks2;
  var albumsTracksArrays = [];
  var albumTracksURL;

  function build_artistURL (artistID) {
    artistURL = apiurl + "/v1/artists/" + artistID;
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
    $.getJSON(artistAlbumsURL, function(json){
      $.each(json.items, function (key, val){
        albumID = val.id;
        artistAlbums.push(albumID);
      });
	  divideCombineAlbums (artistAlbums);
    // Eventually, the rest belongs in a loop iterating through albumsArrays
	  artistAlbums2str = artistAlbums2.join();
	  artistAlbums1str = artistAlbums1.join();
	  build_severalAlbumsURL (artistAlbums1str);
	  getSeveralAlbums (severalAlbumsURL);
    });
    console.log(albumsTracksArrays);
  }

	function divideCombineAlbums (artistAlbums){
		artistAlbums1 = artistAlbums.slice(0,19);
		albumsArrays.push(artistAlbums1);
		artistAlbums2 = artistAlbums.slice(19);
		albumsArrays.push(artistAlbums2);
	}

/*
new version of divideCombineAlbums -- TO BE TESTED
function divideCombineAlbums(artistAlbums){
  var x = artistAlbums/20;
  var firstAlbum = 0;
  var lastAlbum = firstAlbum + 19;
  for (i=0; i<=x; i++){
    artistAlbumsChunk = artistAlbums.slice(firstAlbum, lastAlbum);
    albumsArrays.push(artistAlbumsChunk);
    firstAlbum += 19;
  };
}
*/

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
      divideCombineAlbumTracks (albumTracks);
      emptyTracks ();
    });
    build_albumTracksURL ();
    getSeveralTracks (albumTracksURL);
  });
}

function getSeveralTracks (albumTracksURL) {
  $.getJSON(albumTracksURL, function(json){
    $.each(json.tracks, function (trackIndex, track){
      trackName = track.name;
  		trackPop = track.popularity;
      var trackAlbumName = track.album.name;
      // var trackAlbumID = track.album.id;
  		console.log(trackAlbumName + ' = ' + trackName + ' = ' + trackPop);
    });
  });
}

function emptyTracks (){
  albumTracks = [];
  albumTracks1 = [];
  albumTracks2 = [];
}

function divideCombineAlbumTracks (albumTracks){
  albumTracks1 = albumTracks.slice(0,49);
  albumsTracksArrays.push(albumTracks1);
  if (albumTracks.length > 49) {
    albumTracks2 = albumTracks.slice(49);
    albumsTracksArrays.push(albumTracks2);
  };

}

function build_albumTracksURL () {
  var albumToGet = albumsTracksArrays[0].join();
  albumTracksURL = apiurl + "/v1/tracks?ids=" + albumToGet + "&market=US";
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

});
