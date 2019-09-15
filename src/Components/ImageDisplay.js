import React from 'react'
import LazyLoad from 'react-lazy-load';
// import NoImage from '../../public/no-image.png'

const ImageDisplay = ({image, title}) => {
  console.log(image, title)
    // display placeholder image if no data is available
    // <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
    // const source = image 
    // ? `https://image.tmdb.org/t/p/original/${image}`
    // : '../../public/no-image.png'
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