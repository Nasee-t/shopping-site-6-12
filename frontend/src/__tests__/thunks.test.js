import { sendCartData } from '../features/cart/cartThunks';

describe('cartThunks', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('dispatches success on successful API call', async () => {
    fetch.mockResolvedValue({ ok: true });

    const dispatch = jest.fn();

    await sendCartData({ items: [], totalQuantity: 0 })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ui/showNotification',
      })
    );
  });

  test('dispatches error on failed API call', async () => {
    fetch.mockRejectedValue(new Error('API failed'));

    const dispatch = jest.fn();

    await sendCartData({ items: [], totalQuantity: 0 })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ui/showNotification',
      })
    );
  });
});