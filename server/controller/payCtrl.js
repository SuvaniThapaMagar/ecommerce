const express = require('express');
const paypal = require('@paypal/checkout-server-sdk'); // Make sure to import paypal SDK
const client = require('./paypalClient'); // Ensure this exports the PayPal client instance
const router = express.Router();

router.post('/api/create-paypal-order', async (req, res) => {
  try {
    const accessToken = await getPayPalAccessToken();
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: req.body.total
          }
        }
      ],
      application_context: {
        brand_name: 'Your E-commerce Store',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: 'http://localhost:4000/success',
        cancel_url: 'http://localhost:4000/cancel'
      }
    };

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(order)
    });

    const data = await response.json();
    res.json({ id: data.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
});


// Capture PayPal order
app.post('/api/capture-paypal-order', async (req, res) => {
  const { orderID } = req.body;
  try {
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to capture PayPal order' });
  }
});

// Helper function to get PayPal access token
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`
    }
  });

  const data = await response.json();
  return data.access_token;
}



module.exports = router;
