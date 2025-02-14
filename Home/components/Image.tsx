import React from 'react';
import { ImageProps } from '../../Types/Type';

const Image = ({ src, alt, className, fill, width, height, ...props } : ImageProps) => {
  return <img 
            src={src} 
            alt={alt} 
            className={`${className} ${fill ? 'fill' : ''}`} 
            width={width}
            height={height}
            {...props}
            />;
};

export default Image;