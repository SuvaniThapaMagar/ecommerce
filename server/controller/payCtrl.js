const express = require('express');
const client = require('./paypalClient');
const router = express.Router();

router.post('/create-paypal-order', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'NPR',
          value: req.body.amount, // Amount to charge (you can pass from the frontend)
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
