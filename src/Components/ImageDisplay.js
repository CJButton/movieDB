import React from 'react'
import classnames from 'classnames'
import LazyLoad from 'react-lazy-load';
import noImage from '../noImage.png'

const ImageDisplay = ({image, title}) => {
    const source = image 
    ? `https://image.tmdb.org/t/p/original/${image}`
    : noImage

    return (
      <div className='image-wrapper'>
        <LazyLoad
          height={300}
          debounce={false}
          offsetVertical={200}
          once
        >
          <img
            src={source}
            className={classnames('image-display', { missing: !image })}
            alt={`${title}-poster`}
          />
        </LazyLoad>
        {!image && <small><div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div></small>}
      </div>
    )
}

export default ImageDisplay