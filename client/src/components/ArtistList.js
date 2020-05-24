import React, { useContext } from 'react';
import { PlaylistContext } from '../contexts/PlaylistContext';
import ArtistListStyles from '../styles/ArtistListStyles';

const ArtistList = () => {
  const { playlist } = useContext(PlaylistContext);

  return (
    <ArtistListStyles>
      <div className='headingWrapper'>
        <h2>Artist List by Song Count</h2>
      </div>

      <ul>
        {
          playlist.map(artistCount => (
            <li>
              <span className='artist'>{artistCount.artist}</span>
              <span className='colon'> : </span>
              <span className='count'>{artistCount.value}</span>
            </li>
          ))
        }
      </ul>
    </ArtistListStyles>
  )

}

export default ArtistList;