import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import image from './imgs/logowithtext.png'

//juiste nav kleur: 00a99d

const Header = () =>
    (
        <nav>
            <div className="nav-wrapper">
            <Link to={'/'} className="brand-logo" style={{paddingLeft: "100px"}}><img className="logo" src={image} width="150px"/></Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down" style={{paddingRight: "100px"}}>
                <li><Link to={'/shop'}>Shop</Link></li>
                <li><Link to={'/about'}>About us</Link></li>
            </ul>
            </div>
        </nav>
    )


export default Header