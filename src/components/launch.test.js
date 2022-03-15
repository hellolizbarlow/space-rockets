import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { formatDateTime } from '../utils/format-date';

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

const setupComponent = () => {
  const history = createMemoryHistory();
  return (
    <Router history={history}>
      <TimeAndLocation {...defaultProps}/>
    </Router>);
};

const originalTime = formatDateTime(defaultProps.launch.launch_date_local, true);
const localtime = `Your local time: ${formatDateTime(defaultProps.launch.launch_date_local)}`;

describe('TimeAndLocation', () => {
  test('Should display only original timezone initially', () => {
    const component = setupComponent();
    const { getByText, queryByText } = render(component);
    getByText(originalTime);
    expect(queryByText(localtime)).toBeNull();
  })

  test('Should display local timezone on hover', async () => {
    const component = setupComponent();
    const { getByText } = render(component);
    const date = getByText(originalTime);
    userEvent.hover(date);
    await waitFor(() => getByText(localtime));
  })
})