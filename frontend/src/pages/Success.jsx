import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../features/cart/cartSlice';
import { sendCartData } from '../features/cart/cartThunks';

function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("before clearCart dispatch");
    dispatch(cartActions.clearCart());
    dispatch(
      sendCartData({
        items: [],
        totalQuantity: 0,
      })
    );
    console.log("After clearCart dispatch");
  }, [dispatch]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
    </div>
  );
}

export default Success;