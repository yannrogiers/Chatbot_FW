import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {listProducts} from '../../actions/productActions'


function Shop(props) {

    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        
        
        return () => {
            //
        }
    }, [])
    return (
        loading? <div>Loading...</div> :
        error? <div>{error}</div> :
        <div>
            <div className="container">
                <main className="main">
                    <div className="row">

                        {
                            products.map(product =>
                                <div className="col" >
                                    <div className="product">

                                        <div className="product name">
                                            <Link to={'/products/' + product._id}>

                                                <img className="img-fluid" src={product.image}/>
                                                {product.name}
                                            </Link>
                                        </div>
                                        <div className="product brand">{product.brand}</div>
                                        <div className="product price">{product.price}</div>
                                    </div>
                                </div>
                            )
                        }


                    </div>
                </main>

            </div>

        </div>
    )
}


export default Shop;