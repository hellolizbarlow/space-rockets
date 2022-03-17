import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { FavouritesContextProvider } from '../store/favourites-context';

const withWrapperComponents = (Component, initialFavourites) => (
  <Router history={createMemoryHistory()}>
    <ThemeProvider>
      <CSSReset/>
      <FavouritesContextProvider initialFaves={initialFavourites}>
        {Component}
      </FavouritesContextProvider>
    </ThemeProvider>
  </Router>
);

export default withWrapperComponents;