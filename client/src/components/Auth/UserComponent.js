import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update, logout } from '../../actions/userActions';

function UserComponent(props) {

    //Zelfde logica als sign in component
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const handleLogout = () => {
        //Log user uit
        console.log(userInfo)
        dispatch(logout());
        props.history.push('/signin')
    }

    const submitHandler = (e) => {
        //update usergegevens
        console.log('test')
        e.preventDefault();
        dispatch(update({
            userId: userInfo._id, first_name, last_name, email, password
        }))
    }

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;
    useEffect(() => {
        if (userInfo) {
            setFirstName(userInfo.first_name);
            setLastName(userInfo.last_name);
            setEmail(userInfo.email);
            setPassword(userInfo.password);
        }
        return () => {

        }
    }, [userInfo])


    return (
        <div className="container">

            <div className="col-sm profile-info">
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <h4>Profile</h4>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {success && <div>Profile update success</div>}

                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" name="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="form-control" id="first_name" aria-describedby="firstName" placeholder="Enter first name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" name="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)} className="form-control" id="last_name" aria-describedby="lastName" placeholder="Enter last name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                        <div className="form-group" id="register">
                            <button type="button" onClick={handleLogout} className="btn btn-primary">
                                Logout
                        </button>
                        </div>

                    </form>
                </div>

            </div>

        </div>
    )

}

export default UserComponent