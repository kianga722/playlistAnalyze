import React, { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';
import { PlaylistContext } from '../contexts/PlaylistContext';
import ResultsError from './ResultsError';
import ChartDisplay from './ChartDisplay';
import ArtistList from './ArtistList';
import ResultsWrapperStyles from '../styles/ResultsWrapperStyles';

const ResultsWrapper = () => {
  const { resultsLoading } = useContext(LoadingContext);
  const { playlist, playlistError } = useContext(PlaylistContext);

  if (!resultsLoading && playlistError) {
    return (
      <ResultsError error={playlistError} />
    )
  }

  if (!resultsLoading && playlist) {
    return (
      <ResultsWrapperStyles>
        <ChartDisplay />
        <ArtistList />
      </ResultsWrapperStyles>
    )
  } 

  return null

}

export default ResultsWrapper;