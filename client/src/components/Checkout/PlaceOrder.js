import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import '../shop/shop.css'
import CheckoutSteps from './CheckoutSteps';
import './placeorder.css'
import { createOrder } from '../../actions/orderActions'

function PlaceOrder(props) {

    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const { cartItems, shipping, payment } = cart;
    if (!shipping.address) {
        props.history.push('/shipping')
    }

    if (!payment.paymentMethod) {
        props.history.push('/payment')
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPriceWithoutRounding = 0.21 * itemsPrice;
    const taxPrice = Math.floor(taxPriceWithoutRounding);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        // create an order
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
            taxPrice, totalPrice
        }));
    }


    useEffect(() => {
        if (success) {
            props.history.push("/order/" + order._id);
        }

    }, [success]);


    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h4>Shipping</h4>
                        <div><b>Street and number:</b> {cart.shipping.address}<br></br><b>City:</b>  {cart.shipping.city} <br></br> <b>Postal code:</b> {cart.shipping.postalCode} <br></br> <b>Country:</b> {cart.shipping.country}</div>
                    </div>
                    <div>
                        <h4>Payment</h4>
                        <div>
                            <b>Payment method:</b> {cart.payment.paymentMethod}
                        </div>
                    </div>
                    <div>

                    </div>

                    <h4>Shopping Cart</h4>

                    {cartItems.length === 0 ?
                        <div>Cart is empty</div>

                        :
                        cartItems.map(item => <div className="row test" key={shipping}>
                            <div className="col">
                                <Link to={"/products/" + item.product}>{item.name}</Link>

                            </div>
                            <div className="col"><img width='150px' src={item.image} /></div>

                            <div className="col"> Qty: {item.qty}
                            </div>
                            <div>price</div>
                            <div className="col">€ {item.price}</div>
                        </div>
                        )
                    }


                </div>
                <div className="placeorder-action">
                    <div>
                        <div>
                            <button className="btn btn-primary" onClick={placeOrderHandler}>Place Order</button>
                        </div>
                        <div>
                            <h4>Order summary</h4>
                        </div>
                        <div>
                            <div>Items</div>
                            <div>€{itemsPrice}</div>
                        </div>
                        <div>
                            <div>Shipping</div>
                            <div>€{shippingPrice}</div>
                        </div>
                        <div>
                            <div>Tax</div>
                            <div>€{taxPrice}</div>
                        </div>
                        <div>
                            <div>Total</div>
                            <div>€{totalPrice}</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>


    )
}

export default PlaceOrder;