import React from 'react';
import ResultsErrorStyles from '../styles/ResultsErrorStyles';
// types
type ResultsErrorProps = {
  error: string
}

const ResultsError = ({ error }: ResultsErrorProps) => {
  return (
    <ResultsErrorStyles>
      {error}
    </ResultsErrorStyles>
  )
}

export default ResultsError;