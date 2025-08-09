const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

let cartItems = [];

app.use(bodyParser.json());
app.use(cors());

// Handle preflight requests for the /addToCart endpoint
app.options('/addToCart', cors());

app.post('/addToCart', (req, res) => {
  const newItem = req.body.item;

  if (!newItem || !newItem.id || !newItem.name || !newItem.price || !newItem.quantity) {
    return res.status(400).send('Invalid item data');
  }

  const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += newItem.quantity;
  } else {
    cartItems.push(newItem);
  }

  res.sendStatus(200);
});