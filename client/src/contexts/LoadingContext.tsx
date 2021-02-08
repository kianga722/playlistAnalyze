import React, { createContext, useState } from 'react';
// types
type Props = {
  children: React.ReactNode
};
type LoadingContextInterface = {
  resultsLoading: boolean,
  setResultsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const LoadingInitialContext: LoadingContextInterface = {
  resultsLoading: false,
  setResultsLoading: (): void => {
    throw new Error('setContext function must be overridden');
  },
}


export const LoadingContext = createContext<LoadingContextInterface>(LoadingInitialContext);


const LoadingContextProvider = (props: Props) => {
  const [resultsLoading, setResultsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ resultsLoading, setResultsLoading }}>
      {props.children}
    </LoadingContext.Provider>
  )
}


export default LoadingContextProvider;