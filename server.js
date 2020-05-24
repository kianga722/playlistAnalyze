// import dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const axios = require('axios');

const port = process.env.PORT || 8081;

// define the Express app
const app = express();
// Body Parser
app.use(bodyParser.json());

// Spotify client id
const clientId = process.env.SPOTIFY_CLIENT; 
// Spotify secret
const clientSecret = process.env.SPOTIFY_SECRET; 

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  method: 'post',
  params: {
    grant_type: 'client_credentials',
  },
  headers: {
    'Accept':'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  auth: {
    username: clientId,
    password: clientSecret
  }
};

const parseSpotifyURL = link => {
  const parsed = url.parse(link);
  const pathname = parsed.pathname;
  const strMatch = '/playlist/';

  if (pathname.includes(strMatch) && pathname.length > strMatch.length) {
    const indexStart = pathname.indexOf(strMatch);
    return pathname.slice(indexStart + strMatch.length);
  }
  return pathname;
}

// retrieve playlist
app.post('/api/', async (req, res) => {
  const spotifyLink = req.body.spotifyLink;
  const parsed = parseSpotifyURL(spotifyLink);
  if (!spotifyLink) {
    return res.status(400).send('Bad request');
  }
  console.log(parsed)

  const artistCountMap = {}

  const responseToken = await axios(authOptions)
  const token = responseToken.data['access_token']

  let offset = 0
  let nextUrl = true

  let playlistName = null;

  try {
    // Get Playlist name
    let detailsPlaylist = await axios({
      url: `https://api.spotify.com/v1/playlists/${parsed}
      `,
      method: 'get',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })

    playlistName = detailsPlaylist.data.name;

    // Get Playlist tracks
    while (nextUrl) {
      let responsePlaylist = await axios({
        url: `https://api.spotify.com/v1/playlists/${parsed}/tracks/?offset=${offset}
        `,
        method: 'get',
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      })
  
      responsePlaylist.data.items.forEach(item => {
        item.track.artists.forEach(artist => {
          if (artist) {
            artistCountMap[artist.name] = (artistCountMap[artist.name] || 0) + 1
          }
        })
      })
    
      nextUrl = responsePlaylist.data.next
      offset += 100
    }
  } catch (err) {
    console.log(err.response.data)
    return res.status(400).send(err.response.data.error.message);
  }
  
  // Format playlist object to return
  const playlistArr = Object.keys(artistCountMap).map(artist => {
    if (artist === '') {
      return {
        artist: 'Unknown',
        value: artistCountMap[artist],
      }
    }
    return {
      artist,
      value: artistCountMap[artist],
    }
  })

  playlistArr.sort((a, b) => {
    return b.value - a.value
  })

  res.send({
    playlistName,
    playlistArr
  })
});


// start the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
