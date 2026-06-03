import { Link } from "react-router-dom";

function Cancel() {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your cart is still available.</p>
      <Link to="/">Back to Cart</Link>
    </div>
  );
}

export default Cancel;