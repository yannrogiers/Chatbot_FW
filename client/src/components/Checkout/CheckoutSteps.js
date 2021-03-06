import React from 'react'
import './checkout.css'

function CheckoutSteps(props) {

    //Het renderen van de stappen tijdens het checkoutproces
    return (
        
        <div className="checkoutStep">
            <div className={props.step1 ? 'active':''}> Sign in </div>
            <div className={props.step2 ? 'active':''}> Shipping </div>
            <div className={props.step3 ? 'active':''}> Payment </div>
            <div className={props.step4 ? 'active':''}> Place order </div>
        </div>
    )
}

export default CheckoutSteps