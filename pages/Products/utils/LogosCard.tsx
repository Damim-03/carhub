import React, { useState } from 'react';
import { Image } from '../../../Home/components'
import { ProductProps } from '../../../Types/Type';
import { Link } from 'react-router-dom'

const LogosCard = ({ product }: ProductProps) => {
  return (
    <Link to={`${product.link}`}>
    <div
      className="car-card group transform transition-transform duration-300 
        hover:scale-105 hover:bg-black-100 dark:bg-slate-800 dark:bg-black-900 
        p-4 rounded-lg shadow-md flex flex-col items-center"
      >
      <div className="car-card__content flex flex-col items-center w-full">
        <section className="flex flex-col items-center w-full">
          <div 
            className="relative w-40 h-28 my-4 flex justify-center items-center px-2 py-2 
             sm:w-60 sm:h-40"
          >
            <Image 
              src={product.image} 
              className="relative w-full h-full object-contain"
              alt={product.title}
            />
          </div>
            <h2 
              className="car-card__content-title text-center text-lg font-semibold 
                sm:text-xl hover:text-white dark:text-white mt-4"
            >
              {product.title}
            </h2>
        </section>
      </div>
    </div>
    </Link>
  );
}

export default LogosCard;
