import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import  Landing  from "./pages/Landing";
import  Shop  from "./shop/Shop";
import Header from "./Header_Footer/Header";
import Chatbot from"./chatbot/Chatbot";
import ProductScreen from './shop/ProductScreen'
import CartComponent from './shop/CartComponent'
import Signin from './Auth/Signin'
import Signup from './Auth/Signup'
import ProductUpload from './Products/ProductUpload';
import Shipping from './shop/Shipping';
import Payment from './Checkout/Payment';
import PlaceOrder from './Checkout/PlaceOrder';
import OrderComplete from './Checkout/OrderComplete';
import OrderList from './shop/OrderList';
import UserComponent from './Auth/UserComponent';
import About from './pages/About'


export default class extends Component {
    render () {
        return <div>
        <Router>
        <div className='App'>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <div className="container">
            <Route exact path="/about" component={About}/>
            <Route exact path="/profile" component={UserComponent}/>
            <Route exact path="/products" component={ProductUpload}/>
            <Route exact path="/shop" component={Shop}/>
            <Route path='/order/:id' component={OrderComplete}/>
            <Route exact path="/products/:id" component={ProductScreen}/>
            <Route exact path="/cart/:id?" component={CartComponent}/>
            <Route exact path="/category/:id" component={Shop}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/register" component={Signup}/>
            <Route exact path='/shipping' component={Shipping}/>
            <Route exact path="/payment" component={Payment}/>
            <Route path='/placeorder' component={PlaceOrder}/>
            <Route path='/orders' component={OrderList}/>
            
            
            </div>
        

            <Chatbot/>
        </div>
        </Router>
    </div>
    }

  
}
