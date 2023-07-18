import { useSelector } from 'react-redux';
import styles from "./Navbar.module.css";
import React from 'react';
import { useState } from "react";
import logo from '../../../images/logo_main2.png';
import { useNavigate } from "react-router-dom";
import { Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import DashboardIcon from '@mui/icons-material/Dashboard';


function Navbar({ user }) {

    // adding the states
    const [isActive, setIsActive] = useState(false);

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    //add the active class
    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    //clean up function to remove the active class
    const removeActive = () => {
        setIsActive(false);
    };

    const cartShow = "Cart (" + cartItems.length + ")";

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    return (
        <div className={`${styles.navHeader}`}>
            <nav className={`${styles.navbar}`}>
                {/* logo */}
                <a href="/">
                    <img src={logo} alt='Company Logo' className={`${styles.logo}`} />
                </a>

                <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
                    <li onClick={removeActive}>
                        <a href="/" className={`${styles.navLink}`}>
                            Home
                        </a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="/products" className={`${styles.navLink}`}>
                            Products
                        </a>
                    </li>

                    <li>
                        <form className={`${styles.searchBoxHeader}`} onSubmit={searchSubmitHandler}>
                            <input className={`${styles.searchBoxHeaderInput}`}
                                type="text"
                                placeholder="Search your item ..."
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button type="submit" value="SEARCH" className={`${styles.searchBoxHeaderButton}`}
                                onClick={removeActive} />
                        </form>
                    </li>

                    <li onClick={removeActive}>
                        <a href="/about" className={`${styles.navLink}`}>
                            About
                        </a>
                    </li>


                    <li onClick={removeActive}>
                        <a href="/cart" className={`${styles.navLink}`}>
                            <Tooltip title={cartShow} placement="top">
                                <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />
                            </Tooltip>
                        </a>
                    </li>

                    <li onClick={removeActive}>
                        <a href="/account" className={`${styles.navLink}`}>
                            < PersonIcon />
                        </a>
                    </li>


                </ul>

                <div
                    className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
                    onClick={toggleActiveClass}
                >
                    <span className={`${styles.bar}`}></span>
                    <span className={`${styles.bar}`}></span>
                    <span className={`${styles.bar}`}></span>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
