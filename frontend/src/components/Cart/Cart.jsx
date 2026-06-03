import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const API_URL = import.meta.env.VITE_API_URL;

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleCheckout = async () => {
    try {
      const response = await fetch(
         `${API_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Failed to start checkout");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <h3>Total: ₹{totalPrice}</h3>

      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
