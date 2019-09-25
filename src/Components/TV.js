import React, { useEffect, useState } from 'react'
import ResultBody from './ResultBody'

import { fetchExtrasInfo } from '../requests'

const TV = (props) => {
  const [tvExtras, updateExtras] = useState(
    {createdBy: null, overview: null, first_air_date: null, episode_run_time: null }
  )

  const year = tvExtras.first_air_date ? tvExtras.first_air_date.split('-')[0] : null
  const totalRuntime = tvExtras.episode_run_time ? `${tvExtras.episode_run_time[0]} min` : null

  useEffect(() => {
    const fetchExtras = async () => {
      const {created_by, overview, first_air_date, episode_run_time} = await fetchExtrasInfo('tv', props.id)
      const createdBy = created_by ? created_by.map(person => (person.name)).join(', ') : null
      const runTime = episode_run_time.length ? episode_run_time : null
      updateExtras({createdBy, overview, first_air_date, episode_run_time: runTime})
    }
    fetchExtras()
  }, [props.id])

  return(
    <ResultBody
      type={'tv'}
      header={props.name}
      subtitle={`(${year})`}
      leftOfHyphen={tvExtras.createdBy}
      rightOfHyphen={totalRuntime}
      overview={props.overview}
      voteAverage={props.vote_average}
    />
    // <div className='type-wrapper'>
    //   <div>
    //     <Row>
    //       <h5 className='type-title'>{props.name}</h5>
    //       {year && <h5 className='type-year'>({year})</h5>}
    //     </Row>
    //     <Row className='movie-extras'>
    //         { tvExtras.createdBy && <p className='tv-creators'>Created By: {tvExtras.createdBy}</p>}
    //         { tvExtras.createdBy && totalRuntime && <p className='extras_hyphen'>-</p> }
    //         { totalRuntime && <p className='movie-runtime'>Runtime: {totalRuntime}</p>}
    //     </Row>
    //     <Row>
    //       <p className='movie-overview'>
    //         <TruncateText text={props.overview} />
    //       </p>
    //     </Row>
    //   </div>
    //   <Row className='movie-ratings'>
    //     <Ratings votes={props.vote_average} />
    //   </Row>
    // </div>
  )
}

export default TV