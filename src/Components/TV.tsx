import React, { useEffect, useState } from 'react'
import ResultBody from './ResultBody'

import { fetchExtrasInfo } from '../requests'

type TVType = {
  id: string,
  name: string,
  overview: string,
  vote_average: number
}

interface ExtrasInterface {
  createdBy: null | string,
  overview: null | string,
  first_air_date: null | string,
  episode_run_time: null | Array<number>
}

interface TVInterface {
  created_by: Array<{ name: string }>,
  overview: string,
  first_air_date: string,
  episode_run_time: Array<number>
}

const TV = (props: TVType) => {
  const [tvExtras, updateExtras] = useState<ExtrasInterface>(
    {createdBy: null, overview: null, first_air_date: null, episode_run_time: null }
  )

  useEffect(() => {
    const fetchExtras = async () => {
      const { created_by, overview, first_air_date, episode_run_time }: TVInterface = await fetchExtrasInfo('tv', props.id)

      const createdBy = created_by.map(({ name }) => name).join(', ')
      const runTime = episode_run_time.length ? episode_run_time : null

      updateExtras({createdBy, overview, first_air_date, episode_run_time: runTime})
    }
    fetchExtras()
  }, [props.id])
  
  const year = tvExtras.first_air_date ? `(${tvExtras.first_air_date.split('-')[0]})` : null
  const totalRuntime = tvExtras.episode_run_time ? `${tvExtras.episode_run_time[0]} min` : null

  return(
    <ResultBody
      type={'tv'}
      header={props.name}
      subtitle={year}
      leftOfHyphen={tvExtras.createdBy}
      rightOfHyphen={totalRuntime}
      overview={props.overview}
      voteAverage={props.vote_average}
    />
  )
}

export default TV