import React, { useEffect, useState } from 'react'
import { Line } from 'rc-progress';
import { fetchMovieExtras } from '../requests'
// import PropTypes from 'prop-types'

/**
 * Needs to display --------
 * Title O
 * Overview O
 * Picture O
 * Director O
 * Release Year -> O
 * Runtime -> API broken ATM will be with runtime key in minutes
 * User Rating -> vote_average get an npm to handle this
 * Trailer - https://www.youtube.com/watch?v=SUXWAEX2jlg
 * do an api call here upon loading with append
 * //   const appenderText = '&append_to_response=credits,videos'
 */

const Movie = (props) => {
  const [filmExtras, updateExtras] = useState({runtime: null, director: null, filmPreview: null})
  console.log(props)
  const year = props.release_date.split('-')[0]
  const voteTotal = props.vote_average * 10

  const strokeColors = () => {
    switch (true) {
      case (voteTotal >= 70):
        return '74B832'
      case (voteTotal >= 40):
          return 'F9D44C'
      case (voteTotal > 0):
          return 'E93F3C'
      default: 
        return 'DFE9ED'
    }
  }

  useEffect(() => {
    const fetchExtras = async () => {
      const { runtime, director, filmPreview} = await fetchMovieExtras(props.id)
      console.log(runtime, director, filmPreview, 'returned values -----')
      updateExtras({runtime, director, filmPreview})

    }
    fetchExtras()
  }, [props.id])

  const userRatings = voteTotal ? `${voteTotal}%` : 'Not Rated'
  const totalRuntime = filmExtras.runtime ? `${filmExtras.runtime} min` : null

  return(
    <div>
      <h5>{props.title}</h5>
      <h5>{year}</h5>
      {filmExtras.director && <p>Director: {filmExtras.director}</p>}
      {totalRuntime && <p>Runtime: {totalRuntime}</p>}
      <p>{props.overview}</p>
      <p>User Rating: <b>{userRatings}</b></p>
      <Line 
        percent={voteTotal} 
        strokeWidth="1" 
        strokeColor={`#${strokeColors()}`} />
    </div>
  )
}

export default Movie