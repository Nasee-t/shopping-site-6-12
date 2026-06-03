import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../app/store';
import ProductItem from './ProductItem';

test('clicking add to cart updates store', async () => {
  render(
    <Provider store={store}>
      <ProductItem product={{ id: 'p1', title: 'Test', price: 100 }} />
    </Provider>
  );

  const button = screen.getByText('Add to Cart');
  await userEvent.click(button);

  const state = store.getState();
  expect(state.cart.totalQuantity).toBe(1);
});