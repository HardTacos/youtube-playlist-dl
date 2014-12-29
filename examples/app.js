/*
Name:         youtube-playlist-dl
Description:  Node.js module to download youtube playlists in either .mp4 or .mp3
Source:       https://github.com/hardtacos
Feedback:     https://github.com/hardtacos
License:      MIT License (see LICENSE)
*/

var yt_playlist = require('../lib/youtube-playlist-dl.js');

var j = 1;

console.log('--------------------------------------------------------');
console.log('[INFO] GATHERING VIDEOS FROM SELECTED PLAYLIST');
console.log('--------------------------------------------------------');

var options = {
    playlistUrl : "PLRBp0Fe2GpgmsW46rJyudVFlY6IYjFBIK",
    mp4Directory : "../files/mp4s/",
    mp3Directory : "../files/mp3s/"
}

yt_playlist.retrievePlaylist(options, 1, j);