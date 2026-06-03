import cartReducer, { cartActions } from './cartSlice';

describe('cartSlice', () => {
  test('adding item increases totalQuantity', () => {
    const state = {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      changed: false,
    };

    const newState = cartReducer(
      state,
      cartActions.addItem({
        id: 'p1',
        title: 'Test',
        price: 100,
      })
    );

    expect(newState.totalQuantity).toBe(1);
    expect(newState.items.length).toBe(1);
    expect(newState.totalPrice).toBe(100);
  });

  test('removing item decreases quantity', () => {
    const state = {
      items: [
        { id: 'p1', title: 'Test', price: 100, quantity: 2, totalPrice: 200 },
      ],
      totalQuantity: 2,
      totalPrice: 200,
      changed: false,
    };

    const newState = cartReducer(state, cartActions.removeItem('p1'));

    expect(newState.totalQuantity).toBe(1);
    expect(newState.items[0].quantity).toBe(1);
  });
});