"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// import dependencies
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var path = require('path');
var axios = require('axios');
var port = process.env.PORT || 8081;
// define the Express app
var app = express();
// Body Parser
app.use(bodyParser.json());
// Spotify client id
var clientId = process.env.SPOTIFY_CLIENT;
// Spotify secret
var clientSecret = process.env.SPOTIFY_SECRET;
// your application requests authorization
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
        grant_type: 'client_credentials'
    },
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
        username: clientId,
        password: clientSecret
    }
};
var parseSpotifyURL = function (link) {
    var parsed = url.parse(link);
    var pathname = parsed.pathname;
    var strMatch = '/playlist/';
    if (pathname.includes(strMatch) && pathname.length > strMatch.length) {
        var indexStart = pathname.indexOf(strMatch);
        return pathname.slice(indexStart + strMatch.length);
    }
    return pathname;
};
// retrieve playlist
app.post('/api/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var spotifyLink, parsed, artistCountMap, responseToken, token, offset, nextUrl, playlistName, detailsPlaylist, responsePlaylist, err_1, errMsg, playlistArr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spotifyLink = req.body.spotifyLink;
                parsed = parseSpotifyURL(spotifyLink);
                if (!spotifyLink) {
                    return [2 /*return*/, res.status(400).send('Bad request')];
                }
                console.log(parsed);
                artistCountMap = {};
                return [4 /*yield*/, axios(authOptions)];
            case 1:
                responseToken = _a.sent();
                token = responseToken.data['access_token'];
                offset = 0;
                nextUrl = true;
                playlistName = null;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                return [4 /*yield*/, axios({
                        url: "https://api.spotify.com/v1/playlists/" + parsed + "\n      ",
                        method: 'get',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    })];
            case 3:
                detailsPlaylist = _a.sent();
                playlistName = detailsPlaylist.data.name;
                _a.label = 4;
            case 4:
                if (!nextUrl) return [3 /*break*/, 6];
                return [4 /*yield*/, axios({
                        url: "https://api.spotify.com/v1/playlists/" + parsed + "/tracks/?offset=" + offset + "\n        ",
                        method: 'get',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    })];
            case 5:
                responsePlaylist = _a.sent();
                responsePlaylist.data.items.forEach(function (item) {
                    if (item.track && item.track.artists) {
                        item.track.artists.forEach(function (artist) {
                            if (artist) {
                                artistCountMap[artist.name] = (artistCountMap[artist.name] || 0) + 1;
                            }
                        });
                    }
                });
                nextUrl = responsePlaylist.data.next;
                offset += 100;
                return [3 /*break*/, 4];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                errMsg = void 0;
                if (err_1.response) {
                    if (err_1.response.data) {
                        errMsg = err_1.response.data.error.message;
                    }
                    else {
                        errMsg = err_1.response.statusText;
                    }
                }
                else {
                    errMsg = 'Invalid Input';
                }
                return [2 /*return*/, res.status(400).send(errMsg)];
            case 8:
                playlistArr = Object.keys(artistCountMap).map(function (artist) {
                    if (artist === '') {
                        return {
                            artist: 'Unknown',
                            value: artistCountMap[artist]
                        };
                    }
                    return {
                        artist: artist,
                        value: artistCountMap[artist]
                    };
                });
                playlistArr.sort(function (a, b) {
                    return b.value - a.value;
                });
                res.send({
                    playlistName: playlistName,
                    playlistArr: playlistArr
                });
                return [2 /*return*/];
        }
    });
}); });
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
// start the server
app.listen(port, function () {
    console.log("listening on port " + port);
});
