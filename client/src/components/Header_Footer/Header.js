import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './header.css'
import image from './imgs/logo_white.png'
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

//juiste nav kleur: 00a99d

function Header() {


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;


    return (
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
            <Link to={'/'} className="navbar-brand" style={{ top: "0.1%", paddingLeft: '1%' }}><img className="logo" src={image} alt={image} width="150px" />

            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/shop" className="nav-link">
                            Shop
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                            Cart
                    </Link>
                    </li>
                    <li className="nav-item">
                        {
                            userInfo ? <Link to="/profile">{userInfo.first_name}</Link> :
                                <Link to="/signin" className="linkInNav">Sign in</Link>
                        }
                    </li>
                    <li className="nav-item">
                        {
                            userInfo && userInfo.isAdmin && <Link to="/orders" className="linkInNav">Orders</Link>

                        }
                    </li>
                    <li className="nav-item">
                        {
                            userInfo && userInfo.isAdmin && <Link to="/products" className="linkInNav">Products</Link>
                        }
                    </li>
                </ul>
            </div>

        </nav>
    )


}


export default withRouter(Header)