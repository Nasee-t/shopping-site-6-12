import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData, sendCartData } from '../features/cart/cartThunks';

import Notification from '../components/UI/Notification';
import Navbar from '../components/UI/Navbar';
import ProductList from '../components/Products/ProductList';
import Cart from '../components/Cart/Cart';

function ShoppingPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const isInitial = useRef(true);
  
  // 1. Fetch on load
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // 2. Sync on change
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      <Notification />
      <Navbar />
      <ProductList />
      <Cart />
    </>
  );
}

export default ShoppingPage;