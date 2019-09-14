import React, { useEffect, useState } from 'react'
import { Line } from 'rc-progress'
import { Button } from 'reactstrap'
import ReactPlayer from 'react-player'

import { fetchMovieExtras } from '../requests'
// import PropTypes from 'prop-types'

const Movie = (props) => {
  const [filmExtras, updateExtras] = useState({runtime: null, director: null, filmPreview: null})
  const [isPlayerOpen, updatePlayer] = useState(false)

  const year = props.release_date ? props.release_date.split('-')[0] : null
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
      updateExtras({runtime, director, filmPreview})

    }
    fetchExtras()
  }, [props.id])

  const userRatings = voteTotal ? `${voteTotal}%` : 'Not Rated'
  const totalRuntime = filmExtras.runtime ? `${filmExtras.runtime} min` : null

  return(
    <div>
      <h5>{props.title}</h5>
      {year && <h5>{year}</h5>}
      {filmExtras.director && <p>Director: {filmExtras.director}</p>}
      {totalRuntime && <p>Runtime: {totalRuntime}</p>}
      <p>{props.overview}</p>
      <p>User Rating: <b>{userRatings}</b></p>
      <Line 
        percent={voteTotal} 
        strokeWidth="1" 
        strokeColor={`#${strokeColors()}`} />
      {filmExtras.filmPreview && 
        <Button onClick={() => updatePlayer(!isPlayerOpen)}>
          {/* <i className="fas fa-play"></i> */}
          {isPlayerOpen ? 'Close Trailer' : 'Play Trailer'}
        </Button>
      }
      {isPlayerOpen && 
        <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${filmExtras.filmPreview}`} 
          controls
          playing />}
    </div>
  )
}

export default Movie