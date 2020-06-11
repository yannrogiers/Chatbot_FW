import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveProduct, listProducts, deleteProduct } from '../../actions/productActions';


function ProductUpload(props) {


    //Productupload logica hetzelfde als register/login/edit
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    //Save
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    //delete
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave){
            setModalVisible(false);
        }
        //Runt na componentDidMount, wanneer alles gerendered is op scherm
        dispatch(listProducts());
        return () => {
            //
        }
    }, [successSave, successDelete]);


    /* https://alligator.io/react/modal-component/ */
    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setDescription(product.description);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id: id, name, image, brand, category, price, countInStock, description }));
    }

    const deleteHandler = (product) =>{
        dispatch(deleteProduct(product._id))

    }

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button onClick={() => openModal({})} className="btn btn-primary">Add product</button>
            </div>

            {modalVisible &&
                <div className="form">
                    <h4>Add product to shop</h4>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} className="form-control" id="name" aria-describedby="name" placeholder='Enter product name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input type="text"  value={image} name="image" onChange={(e) => setImage(e.target.value)} className="form-control" id="image" aria-describedby="image" placeholder='upload image' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <input type="text" value={brand} name="brand" onChange={(e) => setBrand(e.target.value)} className="form-control" id="brand" aria-describedby="brand" placeholder='Brand name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input type="text" value={category} name="category" onChange={(e) => setCategory(e.target.value)} className="form-control" id="category" aria-describedby="category" placeholder='Select category' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)} className="form-control" id="price" aria-describedby="price" placeholder='Enter product price' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cntinStock">Count in stock</label>
                            <input type="number" value={countInStock} name="cntinStock" onChange={(e) => setCountInStock(e.target.value)} className="form-control" id="cntinStock" aria-describedby="cntinStock" placeholder='Count in stock' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" value={description} name="description" onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" aria-describedby="description" placeholder='Enter description' />
                        </div>
                        <button type="submit" className="btn btn-primary">{id?"Update" : "Add"}</button>
                        <button type="submit" onClick={() => setModalVisible(false)} className="btn btn-danger">Back</button>
                    </form>
                </div>
            }

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>€ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button onClick={() => openModal(product)} className="btn-primary" >Edit</button>
                                    {' '}
                                    <button onClick={() => deleteHandler(product)} className="btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductUpload
