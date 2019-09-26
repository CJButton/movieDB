import React, { useEffect, useState } from 'react'
import ResultBody from './ResultBody'

import { fetchMovieExtras } from '../requests'

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
    <ResultBody
      type={'movie'}
      header={props.title}
      subtitle={`(${year})`}
      leftOfHyphen={filmExtras.director}
      rightOfHyphen={totalRuntime}
      overview={props.overview}
      voteAverage={props.vote_average}
      preview={filmExtras.filmPreview}
    />
  )
}

export default Movie