/*
Name:         youtube-playlist-dl
Description:  Node.js module to download youtube playlists in either .mp4 or .mp3
Source:       https://github.com/hardtacos/youtube-playlist-dl
Feedback:     https://github.com/hardtacos/youtube-playlist-dl/issues
License:      MIT License (see LICENSE)
*/

var yt_playlist = require('../lib/youtube-playlist-dl.js');

console.log('--------------------------------------------------------');
console.log('[INFO] GATHERING VIDEOS FROM SELECTED PLAYLIST');
console.log('--------------------------------------------------------');

var options = {
    playlistUrl : "PLRBp0Fe2GpgmsW46rJyudVFlY6IYjFBIK", //Popular Music Videos from YouTube
    mp4Directory : "../files/mp4s/",
    mp3Directory : "../files/mp3s/"
}

var j = 0;

yt_playlist.retrievePlaylist(options, 1, j);