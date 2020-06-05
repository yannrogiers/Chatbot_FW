import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions'


function Shop(props) {

    const [searchKeyword, setSearchKeyword] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const category = props.match.params.id ? props.match.params.id : '';
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts(category));
        return () => {
            //
        }
    }, [category])
    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword, sortOrder))
    }

    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, sortOrder))
    }

    console.log(products)

    return (
        <div>
            {category &&
                <h4>{category}</h4>}
            <div className="container breed">
                <div className="row test">
                    <div className="row cat">Categories:</div>

                    <div className="row catprod">
                        <Link to="/shop">All</Link>
                    </div>

                    <div className="row catprod">
                        <Link to="/category/Alarm">Alarms</Link>
                    </div>

                    <div className="row catprod">
                        <Link to="/category/Full Security System">Full System</Link>
                    </div>

                    <div className="row catprod">
                        <Link to="/category/Security Camera">Security Camera</Link>
                    </div>

                    <div className="row catprod">
                        <Link to="/category/Medical Alarm">Medical Alarm</Link>
                    </div>

                    <div className="row catprod">
                        <Link to="/category/Motion Sensors">Motion Sensors</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={submitHandler}>
                        <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>
                <div className="col">
                    <select className="sort" name='sortOrder' onChange={sortHandler}>
                        <option value=''>newest</option>
                        <option value=''>highest</option>
                        <option value=''>lowest</option>
                    </select>
                </div>
            </div>


            {loading && productList && productList.length == 0 ? <div>Loading...</div> :
                error ? <div>{error}</div> :
                    <div>
                        <div className="container">
                            <main className="main">
                                <div className="row">

                                    {
                                        products.map(product =>
                                            <div className="col-2" >
                                                <div className="product">

                                                    <div className="product name">
                                                        <Link to={'/products/' + product._id}>

                                                            <img className="img-fluid" src={product.image} style={{ marginTop: 30 }} width="800px" />
                                                            {product.name}
                                                        </Link>
                                                    </div>
                                                    <div className="product brand"><b>Merk: </b>{product.brand}</div>
                                                    <div className="product price"><b>Prijs: </b>€{product.price}</div>
                                                </div>
                                            </div>
                                        )
                                    }


                                </div>
                            </main>

                        </div>

                    </div>
            }
        </div>
    )


}


export default Shop;