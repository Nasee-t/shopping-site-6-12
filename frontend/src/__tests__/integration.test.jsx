import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import uiReducer from "../features/ui/uiSlice";

// fresh store for each test
function createTestStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
      ui: uiReducer,
    },
  });
}

function renderWithRedux(ui) {
  const store = createTestStore();

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

describe("Cart Integration Tests", () => {
  test('Add to Cart shows item in "Your Cart"', async () => {
    renderWithRedux(<App />);

    const addButtons = screen.getAllByText("Add to Cart");
    await userEvent.click(addButtons[0]);

    expect(screen.getByText("Your Cart")).toBeInTheDocument();

    expect(screen.getByText(/Qty:\s*1/i)).toBeInTheDocument();
  });

  test('Clicking "+" increases quantity and navbar count', async () => {
    renderWithRedux(<App />);

    const addButton = screen.getAllByText("Add to Cart")[0];
    await userEvent.click(addButton);

    const plusButton = screen.getByText("+");
    await userEvent.click(plusButton);

    expect(screen.getByText(/Qty: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Cart Items:/)).toHaveTextContent("2");
  });

  test('Clicking "-" decreases quantity and navbar count', async () => {
    renderWithRedux(<App />);

    const addButton = screen.getAllByText("Add to Cart")[0];

    await userEvent.click(addButton);
    await userEvent.click(addButton);

    const minusButton = screen.getByText("-");
    await userEvent.click(minusButton);

    expect(screen.getByText(/Qty: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Cart Items:/)).toHaveTextContent("1");
  });

  test('clicking "-" removes item completely when quantity is 1', async () => {
    renderWithRedux(<App />);

    const addButton = screen.getAllByText("Add to Cart")[0];
    await userEvent.click(addButton);

    expect(screen.getByText(/Qty: 1/)).toBeInTheDocument();

    const minusButton = screen.getByText("-");
    await userEvent.click(minusButton);

    expect(screen.queryByText(/Qty:/)).not.toBeInTheDocument();

    expect(screen.getByText(/Cart Items:/)).toHaveTextContent("0");
  });
});
