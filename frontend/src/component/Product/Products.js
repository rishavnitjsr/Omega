import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productActions'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useMatch } from "react-router-dom";
import Pagination from "react-js-pagination"
import Typography from '@mui/material/Typography';
import MetaData from "../layout/MetaData";
import Slider from '@mui/material/Slider';
import { toast } from 'react-toastify'

const categories = [
    "Smartphones",
    "Laptops/Computers/Tablets",
    "Headphones and Speakers",
    "Wearables",
    "Cameras",
    "Printers and Scanners",
    "Home Appliances",
    "Accessories"
];

const Products = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 125000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [sort, setSort] = useState('');

    const match = useMatch('/products/:keyword');
    const dispatch = useDispatch()
    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products)

    let keyword;
    if (match && match.params) {
        keyword = match.params.keyword;
    }

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    const sortHandler = (event) => {
        setSort(event.target.value);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings, sort));
    }, [dispatch, keyword, currentPage, price, category, ratings, sort, error])

    let count = filteredProductsCount;

    console.log(" FPC " + filteredProductsCount + " PC : " + productsCount);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title="Products | Omega" />
                    <div className='productContainer'>
                        <div className="filterBox">

                            <Typography>Sort by:</Typography>
                            <select value={sort} onChange={sortHandler} className='sortBox'>
                                <option value="">None</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>

                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={125000}
                                aria-label="Always visible"
                                defaultValue={125000}
                                step={20}

                            // valueLabelDisplay="on"
                            />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                <li className="category-link" onClick={() => setCategory("")}>All Products</li>
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="on"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>

                            <button><a href='/products' className='removeFilter'>Remove All Filters</a></button>

                        </div>


                        <div className='products'>

                            <h2 className='productsHeading'>PRODUCTS</h2>

                            {products &&
                                products.map((products) =>
                                    <ProductCard key={products._id} product={products} />
                                )}

                            {resultPerPage < count && (
                                <div className="paginationBox">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={count}
                                        onChange={setCurrentPageNo}
                                        firstPageText="1st"
                                        lastPageText="Last"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activeClass="pageItemActive"
                                        activeLinkClass="pageLinkActive"
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default Products