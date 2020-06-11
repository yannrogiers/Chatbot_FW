import Axios from 'axios';
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL } from '../constants/orderConstants';


//Order toevoegen door de route api orders & het order zelf te nemen, gelinkt aan het userToken om
//te bevestigen dat de user is ingelogd
const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { userSignin: { userInfo } } = getState();
    const { data: { data: newOrder } } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}


//De details van een specifiek order opvragen door de route api orders en het order id te volgen
const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get('/api/orders/' + orderId, {
      headers: { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }

}

//Als admin een lijst van alle orders opvragen
const listOrders = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get('/api/orders', {
      headers: { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }

}


//betaling van een order
const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.put('/api/orders/' + order._id + '/pay', paymentResult, {
      headers: { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }

}

//Verwijderen van een order als admin
const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.delete('/api/orders/' + orderId, {
      headers: { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }

}

export { createOrder, detailsOrder, payOrder, listOrders, deleteOrder }