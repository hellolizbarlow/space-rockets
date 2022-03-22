import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ChakraProvider } from "@chakra-ui/react";
import { FavouritesContextProvider } from '../store/favourites-context';

const withWrapperComponents = (Component, initialFavourites) => (
  <Router history={createMemoryHistory()}>
    <ChakraProvider>
      <FavouritesContextProvider initialFaves={initialFavourites}>
        {Component}
      </FavouritesContextProvider>
    </ChakraProvider>
  </Router>
);

export default withWrapperComponents;