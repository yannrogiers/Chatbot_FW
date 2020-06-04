import { ADD_ITEM_TO_CART, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

function cartReducer(state = { cartItems: [], shipping:{}, payment:{} }, action) {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if (product) {
                //Als er een product wordt toegevoegd dat bestaat wordt de nieuwe value van quantity applied
                return {cartItems: 
                    state.cartItems.map(x => x.product === product.product ? item : x)};
            }
                //Return vorige state
                return {...state, cartItems: [...state.cartItems, item]};
            case CART_REMOVE_ITEM:
                return { cartItems: state.cartItems.filter(x=>x.product !== action.payload)}
            
            case CART_SAVE_SHIPPING:
                return{...state, shipping: action.payload}

            case CART_SAVE_PAYMENT:
                return{...state, payment: action.payload}
            
            default:
                return state
    }
}
export {cartReducer}