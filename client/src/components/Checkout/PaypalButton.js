import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function PaypalButton(props) {

    /* https://developer.paypal.com/docs/api/orders/v2/ */
    /* https://stackoverflow.com/questions/60541052/resource-not-found-in-paypal */
    const [sdkReady, setSdkReady] = useState(false)

    const addPaypalSdk = async () => {
        const result = await axios.get('/api/config/paypal');
        const clientID = result.data;
        const script = document.createElement('script');
        script.type = "text/javascript";
        script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientID + '&currency=EUR';
        script.async = true;
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script);
    }

    const createOrder = (data, actions) => actions.order.create({
        purchase_units: [
            {
                amount: {
                    currency_code: 'EUR',
                    value: props.amount
                }
            }
        ]
    });

    const onApprove = (data, actions) => actions.order
        .capture()
        .then(details => props.onSuccess(data, details))
        .catch(err => console.log(err));

    useEffect(() => {
        if (!window.paypal) {
            addPaypalSdk()
        }
        return () => {

        }
    }, []);



    if (!sdkReady) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

    return (
        <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)} />
    )
}


export default PaypalButton