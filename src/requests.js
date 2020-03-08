
const HTTP_HEADER = { 'Content-Type': 'application/json',
                      'Accept-Charset' : 'utf-8',
                    };

const MOVIE_DB_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.REACT_APP_API_KEY
const LANGUAGE = '&language=en-US&'
const PAGE = '&page=1'
const ADULT = '&include_adult=false'

// Documentation: https://www.themoviedb.org/documentation/api

/**
 * @param {string} query 
 */
export const fetchSearchResults = (query) => {
  const method = 'GET'
  const url = `search/multi?api_key=${API_KEY}${LANGUAGE}query=${query}${PAGE}${ADULT}`
  return request(url, { method })
}

const attachDirector = (credits) => {
  if (!credits.crew) return null
  const director = credits.crew.find(crewPerson => {
    return crewPerson.job === 'Director'
  })
  return director ? director.name : null
}

const attachFilmPreview = (videos) => {
  if(!videos.results) return null
  if(videos.results[0]) return videos.results[0].key
}

/**
 * @param {string} id 
 */
export const fetchMovieExtras = async (id) => {
  try {
    const method = 'GET'
    const appenderText = '&append_to_response=credits,videos'
    const url = `movie/${id}?api_key=${API_KEY}${appenderText}`
    const res = await request(url, { method })
    if(res.status_code) {
      return { director: null, filmPreview: null, runtime: null }
    }

    const director = attachDirector(res.credits)
    const filmPreview = attachFilmPreview(res.videos)
    const runtime = res.runtime ? res.runtime : null
    return { director, filmPreview, runtime }
  }
  catch(err) {
    console.error(err)
  }
}

/**
 * @param {string} type
 * @param {string} id
 */
export const fetchExtrasInfo = async (type, id) => {
  try {
    const method = 'GET'
    const url = `${type}/${id}?api_key=${API_KEY}`
    return await request(url, { method })
  }
  catch(err) {
    console.error(err)
  }
}

export const request = async (endpoint, options = {}) => {
  const { method } = options
  const url = `${MOVIE_DB_URL}/${endpoint}`
  try {
    const res = await fetch(url, { method, headers: HTTP_HEADER })
    return res.json()
  }
  catch(err) {
    console.error('request error')
  }
}