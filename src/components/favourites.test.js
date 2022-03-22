import React from 'react';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import withWrapperComponents from './withWrapperComponents';

import FavouritesDrawer from './favourites';

const favourites = { 
  launches: [
    {
      "flight_number": 108,
      "mission_name": "Sentinel-6 Michael Freilich",
      "launch_date_unix": 1605979020,
      "launch_date_utc": "2020-11-21T17:17:00.000Z",
      "launch_date_local": "2020-11-21T09:17:00-08:00",
      "rocket": {
        "rocket_id": "falcon9",
        "rocket_name": "Falcon 9",
        "rocket_type": "FT",
      },
      "launch_site": {
        "site_id": "vafb_slc_4e",
        "site_name": "VAFB SLC 4E",
        "site_name_long": "Vandenberg Air Force Base Space Launch Complex 4E"
      },
      "launch_success": true,
      "links": {
        "mission_patch": null,
        "mission_patch_small": null,
        "flickr_images": [
          "https://live.staticflickr.com/65535/50630802488_8cc373728e_o.jpg",
        ]
      },
    },
    {
      "flight_number": 107,
      "mission_name": "Crew-1",
      "launch_date_utc": "2020-11-16T00:27:00.000Z",
      "launch_date_local": "2020-11-15T19:27:00-05:00",
      
      "rocket": {
        "rocket_id": "falcon9",
        "rocket_name": "Falcon 9",
        "rocket_type": "FT",
      },
      "launch_site": {
        "site_id": "ksc_lc_39a",
        "site_name": "KSC LC 39A",
        "site_name_long": "Kennedy Space Center Historic Launch Complex 39A"
      },
      "launch_success": true,
      "links": {
        "mission_patch": "https://i.imgur.com/t5R4BAQ.png",
        "mission_patch_small": "https://i.imgur.com/BzaSAnx.png",
        "flickr_images": [
          "https://live.staticflickr.com/65535/50618376646_8f52c31fc4_o.jpg"
        ]
      }
    }
  ],
  launchPads: [
    {
      "id": 1,
      "name": "Kwajalein Atoll",
      "status": "retired",
      "vehicles_launched": [
        "Falcon 1"
      ],
      "attempted_launches": 5,
      "successful_launches": 2,
      "site_id": "kwajalein_atoll",
      "site_name_long": "Kwajalein Atoll Omelek Island"
    },
    {
      "id": 5,
      "name": "VAFB SLC 3W",
      "status": "retired",
      "vehicles_launched": [
        "Falcon 1"
      ],
      "attempted_launches": 0,
      "successful_launches": 0,
      "site_id": "vafb_slc_3w",
      "site_name_long": "Vandenberg Air Force Base Space Launch Complex 3W"
    }
  ]
}

describe('FavouritesDrawer', () => {
  test('Should display favourites in drawer', async () => {
    const { getByLabelText, getByText } = render(withWrapperComponents(<FavouritesDrawer/>, favourites));
    userEvent.click(getByLabelText("Favourites"));
    await waitFor(() => getByText(favourites.launches[0].mission_name));
    getByText(favourites.launches[1].mission_name);
    getByText(favourites.launchPads[0].name);
    getByText(favourites.launchPads[1].name);
  })

  test('Clicking on favourite in drawer will remove', async () => {
    const { getByLabelText, getByText, queryByText } = render(withWrapperComponents(<FavouritesDrawer/>, favourites));
    userEvent.click(getByLabelText("Favourites"));
    await waitFor(() => getByText(favourites.launches[0].mission_name));
    const launchItem = getByText(favourites.launches[0].mission_name).closest('a');
    userEvent.click(within(launchItem).getByLabelText("Unfavourite"));
    await waitFor(() => expect(queryByText(favourites.launches[0].mission_name)).toBeNull());
  })
})
