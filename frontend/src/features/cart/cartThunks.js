import { cartActions } from './cartSlice';
import { uiActions } from '../ui/uiSlice';

const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = 'http://localhost:8080';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/cart`);

      if (!response.ok) {
        throw new Error('Fetching cart failed');
      }

      return response.json();
    };

    try {
      const data = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity || 0,
        })
      );

    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: 'Failed to fetch cart data!',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {

    dispatch(
      uiActions.showNotification({
        status: 'pending',
        message: 'Sending cart data...',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Sending cart failed');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: 'Cart synced successfully!',
        })
      );

    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: 'Failed to sync cart!',
        })
      );
    }
  };
};