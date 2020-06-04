import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './shipping.css'
import { saveShipping } from '../../actions/cartActions';
import CheckoutSteps from "../Checkout/CheckoutSteps";


function Shipping(props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostal] = useState('');
    const [country, setCountry] = useState('');
    const dispatch = useDispatch();



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country }));
        props.history.push('/payment')
    }

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>

            <div className="form">
                <h4>Shipping</h4>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" onChange={(e) => setAddress(e.target.value)} className="form-control" id="first_name" aria-describedby="address" placeholder="Enter address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" onChange={(e) => setCity(e.target.value)} className="form-control" id="city" aria-describedby="city" placeholder="Enter city" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input type="text" name="country" onChange={(e) => setCountry(e.target.value)} className="form-control" id="country" aria-describedby="country" placeholder="Enter country" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postal">Postal</label>
                        <input type="text" name="postal" onChange={(e) => setPostal(e.target.value)} className="form-control" id="postal" aria-describedby="postal" placeholder="Enter postal code" />
                    </div>
                    <button type="submit" className="btn btn-primary">Continue</button>

                </form>
            </div>
        </div>
    )



}

export default Shipping
