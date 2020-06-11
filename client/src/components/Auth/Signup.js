import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './auth.css'
import { register } from '../../actions/userActions';


function Register(props) {

    //Zelfde logica als in de signIn file.
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split('=')[1]:'/';

    useEffect(() => {
        //Runt na componentDidMount, wanneer alles gerendered is op scherm
        if (userInfo) {
            props.history.push(redirect);
        }

        return () => {
            //
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(first_name, last_name, email, password));
    }

    return (
        <div className="form">
            <h4>Create your account</h4>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" name="first_name" onChange={(e) => setFirstName(e.target.value)} className="form-control" id="first_name" aria-describedby="firstName" placeholder="Enter first name" />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" name="last_name" onChange={(e) => setLastName(e.target.value)} className="form-control" id="last_name" aria-describedby="lastName" placeholder="Enter last name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="rePassword">Confirm Password</label>
                    <input type="password" name="password" onChange={(e) => setRePassword(e.target.value)} className="form-control" id="rePassword" placeholder="Confirm Password" />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <div className="form-group" id="register">
                    Already signed up?<br />
                   <Link to={redirect == "." ? "signin": "signin?redirect=" + redirect }>Sign in here!</Link>
                </div>

            </form>
        </div>
    )
}

export default Register
