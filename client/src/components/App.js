import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import  Landing  from "./pages/Landing";
import  About  from "./pages/About";
import  Shop  from "./shop/Shop";
import Header from "./Header_Footer/Header";
import Chatbot from"./chatbot/Chatbot";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./Auth/Profile";



export default class extends Component {
    render () {
        return <div>
        <Router>
        <div className='App'>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <div className="container">
            
            <Route exact path="/about" component={About}/>
            <Route exact path="/shop" component={Shop}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile" component={Profile}/>
            </div>
        

            <Chatbot/>
        </div>
        </Router>
    </div>
    }

  
}
