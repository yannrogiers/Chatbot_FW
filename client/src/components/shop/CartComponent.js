import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import './shop.css'

function CartComponent(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const productId = props.match.params.id;

    //Nummer uit quantity nemen en aan cart toevoegen
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) =>{
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
        return () => {
            //
        }
    }, [])

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }


    return (
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <h4>Shopping Cart</h4>
                </div>
        
            </div>
            <div>
                {cartItems.length === 0 ?
                    <div>Cart is empty</div>

                    :
                    cartItems.map(item => <div className="row test" key={item.price}>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12"><img src={item.image} width='150px' style={{marginRight: '5%'}} /></div>
                        <div className="col-lg-2 col-md-4 col-sm-8 col-xs-12"> 
                        <Link to={"/products/" + item.product}>{item.name}</Link>
                        
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12"> Qty:
                             <select className="select2" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <button type="button" onClick={() => removeFromCartHandler(item.product)} className="btn btn-danger">x</button>
                            </div>
                        <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">Price: € {item.price}</div>
                    </div>
                    )
                }
            </div>
            <div className="cart">
                <h4>
                    Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    :
                    € {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h4>
                <button className="btn btn-primary" onClick={checkoutHandler} disabled={cartItems.length === 0}>Checkout</button>

            </div>

        </div>

    )
}

export default CartComponent;