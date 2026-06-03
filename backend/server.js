require('dotenv').config();

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const API_URL = process.env.VITE_API_URL;
const APP_URL = process.env.VITE_APP_URL;

let db;
// Initialize Database
(async () => {
    db = await open({
        filename: './shopping_cart.db',
        driver: sqlite3.Database
    });
    // We store the cart as a JSON string in a single row for simplicity
    await db.exec(`
        CREATE TABLE IF NOT EXISTS cart_data (
            id INTEGER PRIMARY KEY,
            data TEXT
        )
    `);
    // Ensure there is at least one row to update
    const row = await db.get('SELECT * FROM cart_data WHERE id = 1');
    if (!row) {
        await db.run('INSERT INTO cart_data (id, data) VALUES (1, ?)', [JSON.stringify({ items: [], totalQuantity: 0 })]);
    }
    console.log("Cart Database Ready.");
})();

// --- API ROUTES ---
// 1. GET /cart - Fetch the stored cart
app.get('/cart', async (req, res) => {
    try {
        const row = await db.get('SELECT data FROM cart_data WHERE id = 1');
        res.json(JSON.parse(row.data));
    } catch (err) {
        res.status(500).json({ message: "Could not fetch cart." });
    }
});

// 2. PUT /cart - Replace the cart with new data
app.put('/cart', async (req, res) => {
    const { items, totalQuantity } = req.body;
    // Simple validation
    if (!Array.isArray(items)) {
        return res.status(400).json({ message: "Invalid cart data." });
    }
    try {
        const cartJson = JSON.stringify({ items, totalQuantity });
        await db.run('UPDATE cart_data SET data = ? WHERE id = 1', [cartJson]);
        res.status(200).json({ message: "Cart synced successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Failed to sync cart." });
    }
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty',
      });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100, // rupees -> paise
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: lineItems,

      success_url: `${APP_URL}/success`,
      cancel_url: `${APP_URL}/cancel`,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to create checkout session',
    });
  }
});

app.listen(8080, () => console.log(`Cart Backend running on ${API_URL}`));