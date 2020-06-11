const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const { isAuth, isAdmin } = require('../util');

/*https://expressjs.com/en/guide/routing.html*/

router.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders)
})


router.get('/:id', isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });

  if (order) {
    res.send(order);
  } else {
    res.status(404).send('Order not found')
  }

})

router.get("/myorders", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  console.log(req)
  res.send(orders);
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });

  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send('Order not found')
  }

})


router.post("/", isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });

  const OrderCreated = await newOrder.save();
  res.status(201).send({ message: "New Order Created", data: OrderCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order paid.', order: updatedOrder })
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});


module.exports = router;