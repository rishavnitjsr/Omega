import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

const ProductCard = ({ product }) => {

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "small"
  }

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <div className='imageContainer'>
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div className='cardContent'>
        <p>{product.name}</p>
        <span id='productPrice'>{`₹${product.price}`}</span>
        <span><Rating {...options} /></span>
        <span id='reviewCount'>
          ({product.numOfReviews} Reviews)
        </span>
      </div>
    </Link>
  )
}

export default ProductCard;