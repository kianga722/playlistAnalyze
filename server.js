// import dependencies
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const port = process.env.PORT || 8081;

// define the Express app
const app = express();

// Your client id
const clientId = process.env.SPOTIFY_CLIENT; 
// Your secret
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

// retrieve playlist
app.get('/api/', async (req, res) => {
  const artistCountMap = {}

  const responseToken = await axios(authOptions)
  const token = responseToken.data['access_token']

  let offset = 0
  let nextUrl = true

  while (nextUrl) {
    let responsePlaylist = await axios({
      url: `https://api.spotify.com/v1/playlists/6enO3OJlZhgPrQfW7kiC0L/tracks/?offset=${offset}`,
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
          artistCountMap[artist.name] = artistCountMap[artist.name] ? artistCountMap[artist.name] + 1 : 1
        }
      })
    })
  
    nextUrl = responsePlaylist.data.next
    offset += 100
  }

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  const playlistArr = Object.keys(artistCountMap).map(artist => {
    if (artist === '') {
      return {
        artist: 'Unknown',
        name: 'Unknown',
        value: artistCountMap[artist],
        radius: artistCountMap[artist],
        color: getRandomColor()
      }
    }
    return {
      artist,
      name: artist,
      value: artistCountMap[artist],
      radius: artistCountMap[artist] * 4,
      color: getRandomColor()
    }
  })

  playlistArr.sort((a, b) => {
    return b.value - a.value
  })

  res.send(playlistArr)
  //res.send(responsePlaylist.data)
});


// start the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
