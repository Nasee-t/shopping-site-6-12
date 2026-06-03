import { useDispatch } from 'react-redux';
import { cartActions } from '../../features/cart/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div>
      <h4>{item.title}</h4>
      <p>Qty: {item.quantity}</p>
      <p>Total: ₹{item.totalPrice}</p>

      <button onClick={() => dispatch(cartActions.addItem(item))}>+</button>
      <button onClick={() => dispatch(cartActions.removeItem(item.id))}>-</button>
      <button onClick={() => dispatch(cartActions.deleteItem(item.id))}>
        Delete
      </button>
    </div>
  );
}

export default CartItem;