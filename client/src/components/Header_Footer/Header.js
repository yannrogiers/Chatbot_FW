import React,{Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './header.css'
import image from './imgs/logo_white.png'

//juiste nav kleur: 00a99d

class Header extends Component{
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>  
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        User
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/shop" className="nav-link">
                        Shop
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Log out
                    </a>
                </li>  
            </ul>
        )
        return(
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar1"
                aria-controls="navbar1"
                aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>

                </button>
                <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                    <ul className="nav-item">
                    <Link to={'/'} className="brand-logo" style={{ top: "0.1%", paddingLeft: '1%' }}><img className="logo" src={image} alt={image} width="150px" />
                            
                            </Link>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                    
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </nav>
        )

        
    }

}

export default withRouter(Header)