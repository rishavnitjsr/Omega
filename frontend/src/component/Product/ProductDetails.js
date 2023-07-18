import React, { Fragment, useEffect, useState } from 'react'
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { useMatch } from "react-router-dom";
import { clearErrors, getProductDetails, newReview } from '../../actions/productActions'
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartActions"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {
  const match = useMatch('/product/:id');
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    if (quantity < 5) {
      setQuantity(qty);
    }
    else {
      toast.error("Can't buy more than 5 quantity.");
    }

  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    toast.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, reviewError, success]);


  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={`${product.name} | Omega`} />
          <div className='ProductDetails'>
            <div>

              {product.images &&
                product.images.map((item, i) => {

                  return (

                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />

                  )
                })}
            </div>
            <div>
              <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className='detailsBlock-2'>
                <Rating {...options} />
                <span>({product.numberOfReviews} Reviews)</span>

              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>

                {product.Stock >= 1 ?

                  (<div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>{" "}
                    <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                  </div>) : (<div><p className='outNotify'>Coming soon.</p></div>)}
                <p>
                  STATUS :{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "In-Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                DESCRIPTION<p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>

            </div>
          </div>

          <h3 className='reviewsHeading'> REVIEWS </h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>


          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))
              }
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetails