import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import Notification from './Notification';

import { uiActions } from '../../features/ui/uiSlice';

test('renders notification when state exists', () => {
  store.dispatch(
    uiActions.showNotification({
      status: 'success',
      message: 'Test message',
    })
  );

  render(
    <Provider store={store}>
      <Notification />
    </Provider>
  );

  expect(screen.getByText('Test message')).toBeInTheDocument();
});