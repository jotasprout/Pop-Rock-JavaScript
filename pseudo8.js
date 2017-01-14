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
    // console.log(artistAlbumsURL);
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

  function build_severalAlbumsURL (albumsString) {
    severalAlbumsURL = apiurl + "/v1/albums?ids=" + albumsString + "&market=US";
  }

function getSeveralAlbums (severalAlbumsURL) {
  // var albumLoop = 0;
  // var albumTracksLoop = 0;
  // var totalTracksLoops = 0;
  $.getJSON(severalAlbumsURL, function(json){
    $.each(json.albums, function (albumIndex, album){
      albumName = album.name;
  		albumPop = album.popularity;
  		albumReleased = album.release_date;
  		console.log(albumName + ' = ' + albumPop + ' = ' + albumReleased);
      // albumLoop++;
      $.each(album.tracks.items, function (trackIndex, track){
  			// trackID = track.id;
  			trackName = track.name;
  			// console.log(trackName + ' = ' + trackID);
  			albumTracks.push(trackName);
        // albumTracksLoop++;
  		});
      // console.log("this is album # " + albumLoop);
      // console.log("tracks on this album = " + albumTracksLoop);
      // totalTracksLoops = totalTracksLoops + albumTracksLoop;
      // console.log("total tracks so far = " + totalTracksLoops);
      // albumTracksLoop = 0;
      // trying to slice all items in albumTracks array then put as item into albumsTracksArrays
      divideCombineAlbumTracks (albumTracks);
      // if this works, code build_severalTracksURL and getSeveralTracks that loops through albumsTracksArrays
      // trying to empty arrays -- garbage clean up sort of
      // albumTracks = [];
      // albumTracks1 = [];
      // albumTracks2 = [];
      emptyTracks ();
    });
    // console.log(albumLoop);
    // console.log(trackLoop);
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
