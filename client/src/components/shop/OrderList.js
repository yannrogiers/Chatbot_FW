import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrders, deleteOrder } from '../../actions/orderActions';


function OrderList(props) {

    //View details
    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    //delete
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrders());
        return () => {
            //
        }
        //Lijst wordt gerefresht wanneer er een order verwijderd wordt
    }, [successDelete]);

    const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id))

    }
    console.log(orders)

    //HTML
    return (
        loading ? <div>Loading...</div> :
        <div className="content content-margined">
            <div className="order-header">
                <h3>Orders</h3>
            </div>

            <div className="order-list">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>User</th>
                            <th>Paid</th>
                            <th>Paid at</th>
                            <th>Delivered</th>
                            <th>Delivered at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (<tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.user.first_name}</td>
                                <td>{order.isPaid.toString()}</td>
                                <td>{order.paidAt}</td>
                                <td>{order.isDelivered.toString()}</td>
                                <td>{order.deliveredAt}</td>
                                <td>
                                    <Link to={"/order/" + order._id} className='btn btn-primary' >Details</Link>
                                    { ' '}
                                    <button type="button" onClick={() => deleteHandler(order)} className='btn btn-danger'>X</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderList
