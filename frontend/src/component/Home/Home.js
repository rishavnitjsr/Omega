import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import Product from "./ProductCard.js"
import MetaData from "../layout/MetaData"
import { clearErrors, getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <Fragment>
            {
                loading ? (<Loader />)
                    : <Fragment>

                        <MetaData title="Omega | HOME " />
                        <div className="banner">
                            <a href="#container">
                                <button align="left">
                                    Scroll <CgMouse />
                                </button>
                            </a>
                        </div>

                        <h2 className='homeHeading'>
                            FEATURED PRODUCTS
                        </h2>

                        <div className='container' id='container'>
                            {products && products.map(product => (
                                <Product key={product._id} product={product} />
                            ))}

                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Home;