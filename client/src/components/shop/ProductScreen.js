import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../../actions/productActions';
import './shop.css'

function ProductScreen(props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        //Runt na componentDidMount, wanneer alles gerendered is op scherm
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, []);

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + "?qty=" + qty)
    }

    return <div>
        <div className="back">
            <Link to="/shop">Back to results</Link>
        </div>

        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                (
                    <div className="">
                        <div className="row">
                            <div className="col-sm-8">
                                <img src={product.image} width="300px" style={{marginTop: '5%'}} className="img-fluid" />
                            </div>
                            <div className="col-sm-4">
                                <h4>{product.name}</h4>
                                <b>Brand: </b>
                                {product.brand}
                                <br></br>
                                <b>Price: </b>€{product.price}
                                <br></br>
                    <b>Description:</b>
                    <br></br>
                    {product.description}
                            </div>
                        </div>
                        <div className="row"> <b>Price: </b>€{product.price}</div>
                        <div className="row">
                            <b> Status: {product.countInStock > 0 ? "In Stock" : ""}</b><br></br>
                        </div>
                        <div className="row">
                            Quantity: <select className="select" value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                {[...Array(product.countInStock).keys()].map(x =>
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                )}
                            </select>

                        </div>
                        <div className="row">
                            {product.countInStock > 0 && <button onClick={handleAddToCart} className="btn btn-primary">Add to cart</button>

                            }

                        </div>
                    </div>


                )}
    </div>




}

export default ProductScreen
