import Axios from "axios"
import { ADD_ITEM_TO_CART, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";
import Cookie from 'js-cookie';

/*https://redux.js.org/basics/actions*/
//Action voor het toevoegen van een item aan de cart doormiddel van de route products + productid te gebruiken
const addToCart = (productId, qty) => async (dispatch, getState) =>{
    try{
        const {data} = await Axios.get('/api/products/' + productId);
        dispatch({type: ADD_ITEM_TO_CART, payload:{
            //Send action to reducer
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });
    const {cart:{cartItems}} = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));

    }catch(error){

    }
}

//Action voor het verwijderen van een item uit de shopping cart
const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart:{cartItems}} = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
}


//Action voor het opslaan van het leveringsadres
const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING, payload:data});
}

//Action voor het opslaan van de betaling
const savePayment = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT, payload:data});
}

export {addToCart, removeFromCart, saveShipping, savePayment}