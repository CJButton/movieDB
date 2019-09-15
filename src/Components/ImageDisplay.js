import React from 'react'
import classnames from 'classnames'
import LazyLoad from 'react-lazy-load';
// import NoImage from '../../public/no-image.png'

const ImageDisplay = ({image, title}) => {
    // display placeholder image if no data is available
    // <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
    const source = image 
    ? `https://image.tmdb.org/t/p/original/${image}`
    : '/no-image.png'
    console.log(source, '-----------')

    return (
      <div className='image-wrapper'>
        <LazyLoad
          height={350}
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
      </div>
    )
}

export default ImageDisplay