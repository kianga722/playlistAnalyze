import React, { useState, useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';
import { PlaylistContext } from '../contexts/PlaylistContext';
import InputLinkStyles from '../styles/InputLinkStyles';

const InputLink = () => {
  const [spotifyLink, setSpotifyLink] = useState('')
  const { resultsLoading } = useContext(LoadingContext);
  const { getPlaylist } = useContext(PlaylistContext);

  const handleAnalyze = async (event) => {
    event.preventDefault();
    if (!spotifyLink) {
      alert('Enter a valid Spotify link!')
      return;
    }
    await getPlaylist(spotifyLink);
  }

  return (
    <InputLinkStyles>
      <h2>Enter Spotify Playlist Link Below:</h2>

      <div className='btnWrapper'>
        <button
          className='clearInput'
          onClick={e => setSpotifyLink('')}
        >
          Clear Input
        </button>
      </div>

      <form>
        <textarea
          value={spotifyLink}
          placeholder='https://open.spotify.com/playlist/5At9Fb2VGMQdij0VT3uR2J'
          onChange={({target}) => setSpotifyLink(target.value)}
        />
        <input
          type='submit'
          onClick={event => handleAnalyze(event)}
          value={resultsLoading ? 'Analyzing...' : 'Analyze'}
          disabled={resultsLoading}
        />
      </form>
    </InputLinkStyles>
  )
}

export default InputLink;