import React, { useState } from "react";
import Signin from "./Signin";
import { Link } from 'react-router-dom';
import './Signup.css';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from '../../helpers/message'
import { showLoading } from '../../helpers/loading'
import { signup } from '../../api/auth'

const Signup = () => {

    const [formData, setFormData] = useState({
        username: 'Yann',
        email: 'yann_rogiers@gmail.com',
        password: 'Azerty',
        password2: 'Azerty',
        successMsg: false,
        errorMsg: false,
        loading: false
    });

    const { username, email, password, password2, successMsg, errorMsg, loading } = formData;
    // console.log(formData)

    /*Event handlers*/
    const handleChange = evt => {
        //  console.log(evt);
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            successMsg: '',
            errorMsg: ''
        })
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        //Client side validation
        if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)) {
            setFormData({
                ...formData, errorMsg: 'All fields are required'
            })
        } else if (!isEmail(email)) {
            setFormData({
                ...formData, errorMsg: 'Invalid email'
            })
        } else if (!equals(password, password2)) {
            setFormData({
                ...formData, errorMsg: 'Passwords do not match'

            })
        } else {
            const { username, email, password } = formData;
            const data = { username, email, password };

            setFormData({ ...formData, loading: true });

            signup(data)
                .then((response) => {
                    console.log('Axios signup success: ', response)
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        password2: '',
                        loading: false,
                        successMsg: response.data.successMessage
                    });
                })
                .catch(err => {
                    console.log('Axios signup error: ', err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage
                    });
                });

        }
        console.log(errorMsg)

    };

    const showSignupForm = () => (
        <form className='signup-form' onSubmit={handleSubmit} noValidate>
            {/*userform*/}
            <div className='form-group input-group'>
                <div className="input-group-prepend">
                </div>
                <input
                    name='username'
                    value={username}
                    className='form-control'
                    placeholder='Username'
                    type='text'
                    onChange={handleChange} />
            </div>
            {/*email*/}
            <div className='form-group input-group'>
                <div className="input-group-prepend">

                </div>
                <input
                    name='email'
                    value={email}
                    className='form-control'
                    placeholder='Email address'
                    type='email'
                    onChange={handleChange} />
            </div>
            {/*Password*/}
            <div className='form-group input-group'>
                <div className="input-group-prepend">

                </div>
                <input
                    name='password'
                    value={password}
                    className='form-control'
                    placeholder='Create password'
                    type='password'
                    onChange={handleChange} />
            </div>

            {/*Password2*/}
            <div className='form-group input-group'>
                <div className="input-group-prepend">

                </div>
                <input
                    name='password2'
                    value={password2}
                    className='form-control'
                    placeholder='Confirm password'
                    type='password'
                    onChange={handleChange} />
            </div>

            {/*Signup button*/}
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                    Sign up
                </button>
                {/*Signup button*/}
                <p className="text-center text-white">
                    <Link to={Signin}>Already have an account?</Link></p>
            </div>

        </form>
    );


    return (
        <div className='signup-container'>
            <div className="row vh-100">
                <div className="col-md-5 mx-auto align-self-center">
                    {showSignupForm()}
                    {errorMsg && showErrorMsg(errorMsg)}
                    {successMsg && showSuccessMsg(successMsg)}
                    {loading && <div className='text-center pb-4'>{showLoading()}</div>}

                </div>
            </div>

        </div>
    )

};


export default Signup;