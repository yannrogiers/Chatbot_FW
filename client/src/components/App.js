import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import  Landing  from "./pages/Landing";
import  About  from "./pages/About";
import  Shop  from "./shop/Shop";
import Header from "./Header_Footer/Header"
import Chatbot from"./chatbot/Chatbot"
import Signup from "./signinup/Signup"
import Signin from "./signinup/Signin"


export default class extends Component {
    render () {
        return <div>
        <BrowserRouter>
        <div>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/shop" component={Shop}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
            <Chatbot/>
        </div>
        </BrowserRouter>
    </div>
    }
}
