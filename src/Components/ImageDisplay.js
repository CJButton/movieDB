import React from 'react'
import LazyLoad from 'react-lazy-load';

const ImageDisplay = ({image, title}) => {
    return (
      <div className='image-wrapper'>
      <LazyLoad
        height={350}
        debounce={false}
        offsetVertical={200}
        once
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${image}`}
          className='image-display'
          alt={`${title}-poster`}
        />
      </LazyLoad>
      </div>
    )
}

export default ImageDisplay