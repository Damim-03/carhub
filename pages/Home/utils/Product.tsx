import React from 'react'
import { Link } from 'react-router-dom'
import { Product_Props } from '../../../Types/Type'

const Product = ({ image, name, slug, price } : Product_Props) => {
  return (
    <div>
      <Link to={`/product`}>
        <div className="product-card">
          <img 
            src={""}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">hello</p>
          <p className="product-price">$87</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
