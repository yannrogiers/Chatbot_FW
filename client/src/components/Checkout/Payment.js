import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../shop/shipping.css'
import { savePayment } from '../../actions/cartActions';
import  CheckoutSteps  from "../Checkout/CheckoutSteps";


function Payment(props) {

    const [paymentMethod, setPaymentmethod] = useState('');

    const dispatch = useDispatch();



    const submitHandler = (e) => {
        e.preventDefault();
        //Doorsturen naar placeorder screen van zodra de betaalmethode gekozen is.
        dispatch(savePayment({paymentMethod}));
        props.history.push('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

            <div className="form">
                <h4>Payment</h4>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input className="form-check-input" type="radio" name="paymentMethod" value="paypal" onChange={(e) => setPaymentmethod(e.target.value)}></input>
                        <label htmlFor="paymentMethod">Paypal</label>
                        
                    </div>
          
                    <button type="submit" className="btn btn-primary">Continue</button>

                </form>
            </div>
        </div>
    )



}

export default Payment
