import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

import { LoadingContext } from './LoadingContext';

export const PlaylistContext = createContext();

const PlaylistContextProvider = props => {
  const { setResultsLoading } = useContext(LoadingContext);

  const [playlistName, setPlaylistName] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [playlistError, setPlaylistError] = useState(null);

  const getPlaylist = async (spotifyLink) => {
    setResultsLoading(true)
    try {
      console.log('Getting playlist data...')
      const response = await axios.post('/api', {
        spotifyLink
      });
      setPlaylistName(response.data.playlistName)
      setPlaylist(response.data.playlistArr)
      setPlaylistError(null)
    } catch (err) {
      console.log(err.response)
      setPlaylistError(err.response.data)
    }
    setResultsLoading(false)
  };

  return (
    <PlaylistContext.Provider value={{ 
      playlistName, setPlaylistName,
      playlist, setPlaylist,
      playlistError,
      getPlaylist
    }}>
      {props.children}
    </PlaylistContext.Provider>
  )
}

export default PlaylistContextProvider;