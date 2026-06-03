import uiReducer, { uiActions } from './uiSlice';

describe('uiSlice', () => {
  test('notification can be set', () => {
    const state = { notification: null };

    const newState = uiReducer(
      state,
      uiActions.showNotification({
        status: 'success',
        message: 'Done',
      })
    );

    expect(newState.notification).toEqual({
      status: 'success',
      message: 'Done',
    });
  });

  test('notification can be cleared', () => {
    const state = {
      notification: { status: 'error', message: 'Fail' },
    };

    const newState = uiReducer(state, uiActions.clearNotification());

    expect(newState.notification).toBeNull();
  });
});