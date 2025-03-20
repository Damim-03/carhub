import React from 'react';
import { ImageProps } from '../../Types/Type';

const Image = ({ src, alt, className, fill, width, height, ...props }: ImageProps) => {
    // Remove `priority` before passing props to the <img> element
    const { priority, ...restProps } = props;

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} ${fill ? 'fill' : ''}`}
            width={width}
            height={height}
            {...restProps} // Spread only valid attributes
        />
    );
};

export default Image;
