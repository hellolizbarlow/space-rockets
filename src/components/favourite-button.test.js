import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import withWrapperComponents from './withWrapperComponents';

import FavouriteButton, { TYPES } from './favourite-button';

const launchProps = {
  type: TYPES.LAUNCH,
  item: { "flight_number": 108 }
}

const launchPadProps = {
  type: TYPES.LAUNCHPAD,
  item: { "site_id": 108}
}

describe('FavouriteButton', () => {
  test('Favourite button launch', async () => {
    const { getByLabelText } = render(withWrapperComponents(<FavouriteButton {...launchProps}/>));
    const favouriteButton = getByLabelText('Favourite');
    userEvent.click(favouriteButton);
    await waitFor(() => getByLabelText('Unfavourite'));
    userEvent.click(favouriteButton);
    await waitFor(() => getByLabelText('Favourite'));
  })

  test('Favourite button launch pad', async () => {
    const { getByLabelText } = render(withWrapperComponents(<FavouriteButton {...launchPadProps}/>));
    const favouriteButton = getByLabelText('Favourite');
    userEvent.click(favouriteButton);
    await waitFor(() => getByLabelText('Unfavourite'));
    userEvent.click(favouriteButton);
    await waitFor(() => getByLabelText('Favourite'));
  })

  test('Set correctly for an existing favourite', () => {
    const favourites = { 
      launches: [
        {
          "flight_number": 108,
          "mission_name": "Sentinel-6 Michael Freilich",
        }
      ],
      launchPads: []
    }
    const { getByLabelText } = render(withWrapperComponents(<FavouriteButton {...launchProps}/>, favourites));
    getByLabelText('Unfavourite');
  })
})