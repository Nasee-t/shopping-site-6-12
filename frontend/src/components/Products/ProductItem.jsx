import { useDispatch } from 'react-redux';
import { cartActions } from '../../features/cart/cartSlice';

function ProductItem({ product }) {
  const dispatch = useDispatch();
  
  const addToCartHandler = () => {
    dispatch(cartActions.addItem(product));
  };

  return (
    <div>
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;