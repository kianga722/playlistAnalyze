import React from 'react';

import LoadingContextProvider from './contexts/LoadingContext';
import PlaylistContextProvider from './contexts/PlaylistContext';

import Header from './components/Header';
import InputLink from './components/InputLink';
import ResultsWrapper from './components/ResultsWrapper';

import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles';
import AppStyles from './styles/AppStyles';

const theme = {
  background: '#F8F8F8',
  black: '#000',
  white: '#FFF',
  green: '#1DB954',
  lightGreen: '#1ED760',
  pink: '#FF7180',
  blue: '#2D46B9',
  darkBlue: '#1E3264'
}

function App() {
  return (
    <ThemeProvider theme={theme}>

      <AppStyles className='App'>
        <LoadingContextProvider>
          <PlaylistContextProvider>

            <Header />
            <InputLink />
            <ResultsWrapper />

          </PlaylistContextProvider>
        </LoadingContextProvider>
      </AppStyles>

      <GlobalStyles />

    </ThemeProvider>
  );
}

export default App;
