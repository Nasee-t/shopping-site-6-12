import { useSelector } from 'react-redux';

function Navbar() {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <header>
      <h1>Redux Shop</h1>
      <div>Cart Items: {totalQuantity}</div>
    </header>
  );
}

export default Navbar;