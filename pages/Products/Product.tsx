import React from 'react';
import { Footer, NavBar } from '../../Home';
import { LogosCard } from '../../pages/Products/utils'
import { Products } from '../../constants/constant';
import { ProductProps } from '../../Types/Type';
import{ useNavigate } from 'react-router-dom';

const Product = ({ product }: ProductProps): JSX.Element => {
  return (
    <>
    <div className="bg-white dark:bg-slate-800 min-h-screen">
  <NavBar />
  <div className="hero">
    <div className="flex-1 pt-16 px-4 sm:pt-24 sm:px-8 lg:pt-36 lg:px-16">
      <div 
        className="home__cars-wrapper grid grid-cols-1 gap-4 sm:grid-cols-2 
                   md:grid-cols-3 lg:grid-cols-4 py-3 px-4 sm:px-6"
      >
         {Products.map((product, index) => (
        <LogosCard
          key={index}
          product={product}
        />
      ))}
      </div>
    </div>
      <div className="hero__image-overlay" />
  </div>
  <Footer />
</div>

     
    </>
  );
}

export default Product;
