import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { cartActions } from "../features/cart/cartSlice";
import { sendCartData } from "../features/cart/cartThunks";

function Success() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContinueShopping = async () => {
    await dispatch(
      sendCartData({
        items: [],
        totalQuantity: 0,
      }),
    );

    dispatch(cartActions.clearCart());

    navigate("/");
  };

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <button onClick={handleContinueShopping}>Continue Shopping</button>
    </div>
  );
}

export default Success;
