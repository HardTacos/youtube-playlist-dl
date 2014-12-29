/*
Name:         youtube-playlist-dl
Description:  Node.js module to download youtube playlists in either .mp4 or .mp3
Source:       https://github.com/hardtacos
Feedback:     https://github.com/hardtacos
License:      MIT License (see LICENSE)
*/

var async = require('async');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var ytdl = require('youtube-dl');
var youtube = require('youtube-feeds');

var app = module.exports = {
    retrievePlaylist: function(options, start_index, j) {
        youtube.feeds.playlist(
            options.playlistUrl, {
                'max-results': 50,
                'start-index': start_index
            },
            function(err, data) {
                if (err instanceof Error) {
                    console.log("Error 1: " + err);
                    return 0;
                }
                else {
                    var playlistArray = data.items;
                    var i = 0;

                    var loopArray = function(arr) {
                        displayItems(arr, i, function() {
                            i++;
                            if (i < playlistArray.length) {
                                loopArray(arr);
                            }
                            else {
                                console.log('--------------------------------------------------------');
                                console.log('[INFO] ALL VIDEOS HAVE BEEN DOWNLOADED');
                                console.log('--------------------------------------------------------');
                                process.exit();
                            }
                        });
                    }

                    loopArray(playlistArray);

                    function displayItems(msg, i, callback) {
                        var title = msg[i].video.title;
                        var regex = /(\/)|(\[.*?\] - )|(\[.*?\])|(\()|(\)|\.)/g;
                        title = title.replace(regex, '');
                        title = title.trim();
                        var id = msg[i].video.id;

                        if ((j % 10 === 0) && j < 200) {
                            console.log(j + ") " + title);
                            async.series([
                                function(callback) {
                                    app.downloadVideo(id, title, options, callback);
                                }
                            ], function(err) {
                                app.retrievePlaylist(options, j + 1, j + 1);
                            });
                        }
                        else {
                            console.log(j + ") " + title);
                            j++;
                            app.downloadVideo(id, title, options, callback);
                        }
                    }
                }
            }
        )
    },
    downloadVideo: function(id, title, options, callback) {
        var mp4FileName = title + '.mp4';
        var mp3FileName = title + '.mp3';
        var mp4Directory = options['mp4Directory'];
        var mp3Directory = options['mp3Directory'];
        var video = ytdl("https://www.youtube.com/watch?v=" + id, ['--max-quality=18']);
        var output = path.join(mp4Directory, mp4FileName);
        var mp3Check = path.join(mp3Directory, mp3FileName);

        if (fs.existsSync(mp3Check)) {
            process.stdout.write('---Complete \n');
            callback();
        }
        else {
            var size = 0;
            video.on('error', function(err) {
                console.log("Error 2:  " + err);
                callback();
            });

            video.on('info', function(info) {
                size = info.size;
                video.pipe(fs.createWriteStream(output));
            });

            var pos = 0;
            video.on('data', function(data) {
                pos += data.length;
                if (size) {
                    var percent = (pos / size * 100).toFixed(2);
                    if (percent == 100) {
                        return 0;
                    }
                    else {
                        process.stdout.cursorTo(0);
                        process.stdout.clearLine(1);
                        process.stdout.write(percent + '%');
                    }
                }
            });

            video.on('end', function() {
                process.stdout.cursorTo(0);
                process.stdout.clearLine(1);
                process.stdout.write('---Complete \n');

                app.convertMP3(mp4FileName, mp4Directory, mp3Directory, callback);
            });
        }
    },
    convertMP3: function(fileName, mp4Directory, mp3Directory, callback) {
        process.stdout.cursorTo(0);
        process.stdout.clearLine(1);
        process.stdout.write('---Converting to MP3');

        var regex = /(\.mp4)/g;
        var MP3fileName = fileName.replace(regex, '.mp3');

        var mp4 = mp4Directory + fileName;
        var mp3 = mp3Directory + MP3fileName;

        var convertVideo = exec('ffmpeg -i "' + mp4 + '" "' + mp3 + '"',
            function(error, stdout, stderr) {
                process.stdout.cursorTo(0);
                process.stdout.clearLine(1);
                process.stdout.write('---Converted \n');
                app.deleteVideo(fileName, callback);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
    },
    deleteVideo: function(fileName, callback) {
        var removeVideo = exec('rm "../files/mp4s/' + fileName + '"',
            function(error, stdout, stderr) {
                callback();
                if (error !== null) {
                    console.log('exec error: ' + error);
                    //callback();
                }
            });
    }
};