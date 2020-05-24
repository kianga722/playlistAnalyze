import React from 'react';
import ResultsErrorStyles from '../styles/ResultsErrorStyles';

const ResultsError = ({ error }) => {
  return (
    <ResultsErrorStyles>
      {error}
    </ResultsErrorStyles>
  )
}

export default ResultsError;