import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import image from './imgs/logowithtext.png'

//juiste nav kleur: 00a99d

const Header = () => {

   const showNavigation = () => (
        /*<nav>
             <div className="nav-wrapper">
                 <Link to={'/'} className="brand-logo" style={{ paddingLeft: "100px" }}><img className="logo" src={image} alt={image} width="150px" /></Link>
                 <ul id="mobile-demo" className="sidenav" style={{ paddingRight: "100px" }}>
                     <li><Link to={'/shop'}>Shop</Link></li>
                     <li><Link to={'/about'}>About us</Link></li>
                 </ul>
             </div>
         </nav>*/
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand" ><img className="logo" src={image} alt={image} width="150px" /></Link>
            <button className="navbar-toggler"
                type="button" data-toggle="collapse"
                data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation">

                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link to={'/shop'} className="nav-link" >Shop <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/about'} className="nav-link" href="#" tabIndex="-1" >About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Signup'} className="nav-link" href="#" tabIndex="-1" >Sign up</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Signin'} className="nav-link" href="#" tabIndex="-1" >Sign in</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );

    //Render
    return (
        <header id="header">
            { showNavigation()}

        </header>
    );

};


export default Header