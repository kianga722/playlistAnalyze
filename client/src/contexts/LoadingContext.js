import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

const LoadingContextProvider = (props) => {
  const [resultsLoading, setResultsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ resultsLoading, setResultsLoading }}>
      {props.children}
    </LoadingContext.Provider>
  )
}


export default LoadingContextProvider;