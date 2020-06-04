import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './auth.css'
import { signin } from '../../actions/userActions';


function Signin(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, error} = userSignin
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split('=')[1]:'/';

    useEffect(() => {
        //Runt na componentDidMount, wanneer alles gerendered is op scherm
        if(userInfo){
            props.history.push(redirect);
        }
        
        return () => {
            //
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return(
        <div className="form">
            <h4>Sign in</h4>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" placeholder="enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Passwprd</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
                <div className="form-group" id="register">
                    New to Security at Home?<br/>
                    <Link to={redirect == "." ? "register": "register?redirect=" + redirect }>Create your account now!</Link>
                </div>

            </form>
        </div>
    )



}

export default Signin
