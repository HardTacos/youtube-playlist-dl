## YouTube Playlist Downloader
### youtube-playlist-dl driver for node

[![NPM](https://nodei.co/npm/youtube-playlist-dl.png?downloads=true&stars=true)](https://nodei.co/npm/youtube-playlist-dl/)

Download entire playlists from youtube, then convert them to .mp3 format in 
node.js using youtube_playlist_dl.

The majority of this is done using the `youtube-dl` package, however I was able 
to make it much simpler to utilize if all you need to do is download and convert
the playlist to .mp3

### Usage

This is the entire example app that I have written for you.

**NOTE: You need to make sure that you have [ffmpeg installed.](https://www.ffmpeg.org/download.html)**

```js
var yt_playlist = require('../lib/youtube-playlist-dl.js');

// Starts the count for the playlist size. 
var j = 1;

console.log('--------------------------------------------------------');
console.log('[INFO] GATHERING VIDEOS FROM SELECTED PLAYLIST');
console.log('--------------------------------------------------------');

var options = {
    playlistUrl : "PLRBp0Fe2GpgmsW46rJyudVFlY6IYjFBIK", // The playlist id. url: "playlist?list=..."
    mp4Directory : "../files/mp4s/",
    mp3Directory : "../files/mp3s/"
}

yt_playlist.retrievePlaylist(options, 1, j);
```

##### Install

`npm install youtube-playlist-dl`

##### License

MIT
