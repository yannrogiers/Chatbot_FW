import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import '../shop/shop.css'
import './placeorder.css'
import { detailsOrder, payOrder } from '../../actions/orderActions'
import PaypalButton from './PaypalButton'

function Order(props) {

    const orderPay = useSelector(state => state.orderPay);
    const{loading: loadingPay, success: successPay, error: errorPay} = orderPay
    const dispatch = useDispatch();
    useEffect(() => {
        if(successPay){
            props.history.push('/profile')
        }else{
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
        loading ? <div>Loading...</div> : error ? <div>{error}</div> :
            <div>
                <div className="placeorder">
                    <div className="placeorder-info">
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
                                <b>{order.isPaid ? 'Paid at ' + order.paidAt : 'Not delivered.'}</b>
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className="">
                            <h4>Shopping cart</h4>
                            <div className="">
                                {order.orderItems.length === 0 ?
                                    <div>Cart is empty</div>

                                    :
                                    order.orderItems.map(item => <div className="row test" key={order}>
                                        <div className="col"><img src={item.image} /></div>
                                        <div className="col-2">
                                            <Link to={"/product/" + item.product}>{item.name}</Link>

                                        </div>
                                        <div className="col-6"> Qty: {item.qty}
                                        </div>
                                        <div>price</div>
                                        <div className="col col-lg-2">€ {item.price}</div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="placeorder-action">
                        <div>
                            <div className="placeorder-action-pay">
                                {!order.isPaid &&
                                    <PaypalButton
                                        amount={order.totalPrice}
                                        onSuccess={handleSuccessPayment} />}
                            </div>
                            <div>
                                <h4>Order summary</h4>
                            </div>
                            <div>
                                <div>Items</div>
                                <div>€{order.itemsPrice}</div>
                            </div>
                            <div>
                                <div>Shipping</div>
                                <div>€{order.shippingPrice}</div>
                            </div>
                            <div>
                                <div>Tax</div>
                                <div>€{order.taxPrice}</div>
                            </div>
                            <div>
                                <div>Total</div>
                                <div>€{order.totalPrice}</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


    )
}

export default Order;