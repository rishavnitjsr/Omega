import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { logout } from '../../actions/userAction';
import { useDispatch } from 'react-redux';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    function logoutUser() {
        dispatch(logout());
        window.location.href = '/';
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />

                    <div className="profileContainer">
                        <div className='cardContainer'>
                            <div>
                                <h1>My Profile</h1>
                                <div>
                                    <img src={user.avatar.url} alt={user.name} />
                                </div>
                                <Link to="/me/update">Edit Profile</Link>

                                <div>
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                                </div>

                                <div>
                                    <h4>Email</h4>
                                    <p>{user.email}</p>
                                </div>

                                <div>
                                    <h4>Joined On</h4>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>
                                </div>
                            </div>

                            <div>

                                <div className='linkContainer'>
                                    <Link to="/">Home</Link>
                                    <Link to="/orders">My Orders</Link>
                                    <Link to="/cart">Cart</Link>
                                    <Link to="/password/update">Change Password</Link>
                                    {
                                        user.role === 'admin' ?
                                            <Link to="/admin/dashboard">DashBoard</Link> : <Fragment></Fragment>
                                    }
                                    <Link onClick={logoutUser}>Log Out</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile