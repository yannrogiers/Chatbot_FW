import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import '../shop/shop.css'
import './placeorder.css'
import { detailsOrder, payOrder } from '../../actions/orderActions'
import PaypalButton from './PaypalButton'

function Order(props) {

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay, error: errorPay } = orderPay
    const dispatch = useDispatch();
    useEffect(() => {
        if (successPay) {
            props.history.push('/profile')
        } else {
            dispatch(detailsOrder(props.match.params.id));
        }

        return () => {
        }
    }, [successPay])

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;


    return (
        loading ? <div className="">Loading...</div> : error ? <div className="">{error}</div> :

            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div>
                            <h4>Shipping</h4>
                            <div><b>Street and number:</b> {order.shipping.address}<br></br><b>City:</b>  {order.shipping.city} <br></br> <b>Postal code:</b> {order.shipping.postalCode} <br></br> <b>Country:</b> {order.shipping.country}</div>
                        </div>
                        <div>
                            <b>{order.isDelivered ? 'Delivered at ' + order.deliveredAt : 'Not delivered.'}</b>
                        </div>
                        <div>
                            <h4>Payment</h4>
                            <div>
                                <b>{order.isPaid ? 'Paid at ' + order.paidAt : 'Not paid.'}</b>
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className="row">
                            <h4>Shopping cart</h4>
                            <div className="row">
                                {order.orderItems.length === 0 ?
                                    <div>Cart is empty</div>

                                    :
                                    order.orderItems.map(item => <div className="test" key={order}>
                                        <div className="row">
                                            <div className="col-md-7">
                                                <Link to={"/products/" + item.product}>{item.name}</Link>
                                                <img width='150px' src={item.image} />
                                            </div>
                                            <div className="col-md-7">
                                                <div><b>Quantity:</b> {item.qty}</div>
                                                <div><b>price:</b> €{item.price}</div>
                                    
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <div className="">
                                {!order.isPaid &&
                                    <PaypalButton
                                        amount={order.totalPrice}
                                        onSuccess={handleSuccessPayment} />}
                            </div>
                            <div>
                                <h4>Order summary</h4>
                            </div>
                            <div>
                                <div><b>Items</b></div>
                                <div>€{order.itemsPrice}</div>
                            </div>
                            <div>
                                <div><b>Shipping</b></div>
                                <div>€{order.shippingPrice}</div>
                            </div>
                            <div>
                                <div><b>Tax</b></div>
                                <div>€{order.taxPrice}</div>
                            </div>
                            <div>
                                <div><b>Total</b></div>
                                <div>€{order.totalPrice}</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


    )
}

export default Order;