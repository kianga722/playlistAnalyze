import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { LoadingContext } from './LoadingContext';
// types
type Props = {
  children: React.ReactNode
};
export type artistItem = {
  artist: string,
  value: number
}

type PlaylistContextInterface = {
  playlistName: string | null,
  setPlaylistName: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<null>>,
  playlist: artistItem[] | null,
  setPlaylist: React.Dispatch<React.SetStateAction<artistItem[]>> | React.Dispatch<React.SetStateAction<null>>,
  playlistError: string | null,
  getPlaylist: (spotifyLink: string) => void,
}
const PlaylistInitialContext: PlaylistContextInterface = {
  playlistName: null,
  setPlaylistName: (): void => {
    throw new Error('setContext function must be overridden');
  },
  playlist: null,
  setPlaylist: (): void => {
    throw new Error('setContext function must be overridden');
  },
  playlistError: null,
  getPlaylist: () => {}
}


export const PlaylistContext = createContext<PlaylistContextInterface>(PlaylistInitialContext);

const PlaylistContextProvider = (props: Props) => {
  const { setResultsLoading } = useContext(LoadingContext);

  const [playlistName, setPlaylistName] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [playlistError, setPlaylistError] = useState(null);

  const getPlaylist = async (spotifyLink: string) => {
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