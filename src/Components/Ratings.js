import React from 'react'
import { Line } from 'rc-progress'

const Ratings = ({votes}) => {

  const voteTotal = votes * 10
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

  const userRatings = voteTotal ? `${voteTotal}%` : 'Not Rated'
  
  return (
    <div className='ratings'>
      <div className='ratings_number'>User Rating: <b>{userRatings}</b></div>
      <Line
        percent={voteTotal} 
        strokeWidth="3" 
        strokeColor={`#${strokeColors()}`} />
    </div>
  )
}

export default Ratings