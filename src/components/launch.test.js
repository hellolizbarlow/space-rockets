import React from 'react';
import '../utils/match-media.mock';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { formatDateTime } from '../utils/format-date';
import withWrapperComponents from './withWrapperComponents';

import  { TimeAndLocation }  from './launch';

const defaultProps = {
  launch: {
    "launch_date_utc":"2020-11-21T17:17:00.000Z",
    "launch_date_local":"2020-11-21T09:17:00-08:00",
    "launch_site": {
      "site_id":"vafb_slc_4e",
      "site_name":"VAFB SLC 4E",
      "site_name_long":"Vandenberg Air Force Base Space Launch Complex 4E"
    }
  }
}

const originalTime = formatDateTime(defaultProps.launch.launch_date_local, true);
const localtime = `Your local time: ${formatDateTime(defaultProps.launch.launch_date_local)}`;

describe('TimeAndLocation', () => {
  test('Should display only original timezone initially', () => {
    const { getByText, queryByText } = render(withWrapperComponents(<TimeAndLocation {...defaultProps}/>));
    getByText(originalTime);
    expect(queryByText(localtime)).toBeNull();
  })

  test('Should display local timezone on hover', async () => {
    const { getByText } = render(withWrapperComponents(<TimeAndLocation {...defaultProps}/>));
    const date = getByText(originalTime);
    userEvent.hover(date);
    await waitFor(() => getByText(localtime));
  })
})