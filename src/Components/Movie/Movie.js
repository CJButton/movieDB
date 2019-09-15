import React, { useEffect, useState } from 'react'
import { Row } from 'reactstrap'
import Ratings from './Ratings'
import Preview from './Preview'

import { fetchMovieExtras } from '../../requests'
// import PropTypes from 'prop-types'

const Movie = (props) => {
  const [filmExtras, updateExtras] = useState({runtime: null, director: null, filmPreview: null})

  const year = props.release_date ? props.release_date.split('-')[0] : null

  useEffect(() => {
    const fetchExtras = async () => {
      const { runtime, director, filmPreview} = await fetchMovieExtras(props.id)
      updateExtras({runtime, director, filmPreview})
    }
    fetchExtras()
  }, [props.id])

  const totalRuntime = filmExtras.runtime ? `${filmExtras.runtime} min` : null

  return(
    <div className='movie'>
      <Row>
        <h5 className='movie-title'>{props.title}</h5>
        {year && <h5 className='movie-year'>({year})</h5>}
      </Row>
      <Row className='movie-extras'>
        {filmExtras.director && <p className='movie-director'>Director: {filmExtras.director}</p>}
        { filmExtras.director && totalRuntime && <p className='movie-extras_hyphen'>-</p> }
        {totalRuntime && <p className='movie-runtime'>Runtime: {totalRuntime}</p>}
      </Row>
      <Row>
        <p className='movie-overview'>{props.overview}</p>
      </Row>
      <Row className='movie-ratings'>
        <Ratings votes={props.vote_average} />
        <Preview previewID={filmExtras.filmPreview} />
      </Row>
    </div>
  )
}

export default Movie