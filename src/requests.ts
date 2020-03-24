
const HTTP_HEADER = { 'Content-Type': 'application/json',
                      'Accept-Charset' : 'utf-8',
                    };

const MOVIE_DB_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.REACT_APP_API_KEY
const LANGUAGE = '&language=en-US&'

// Documentation: https://www.themoviedb.org/documentation/api

export const fetchTrending = (searchType: string) => {
    const method = 'GET'
    const url = `trending/${searchType}/day?api_key=${API_KEY}`
    return request(url, { method })
}

export const fetchType = (type: string, query: string, page: number) => {
    const method = 'GET'
    const url = `search/${type}?api_key=${API_KEY}${LANGUAGE}query=${query}&page=${page.toString()}`
    return request(url, { method })
}

const attachDirector = (credits: any) => {
  if (!credits.crew) return null
  const director = credits.crew.find((crewPerson: any) => {
    return crewPerson.job === 'Director'
  })
  return director ? director.name : null
}

const attachFilmPreview = (videos: { results: Array<any> }) => {
  if(!videos.results) return null
  if(videos.results[0]) return videos.results[0].key
}

/**
 * @param {string} id 
 */
export const fetchMovieExtras = async (id: string) => {
  try {
    const method = 'GET'
    const appenderText = '&append_to_response=credits,videos'
    const url = `movie/${id}?api_key=${API_KEY}${appenderText}`
    const res = await request(url, { method })
    if(res.status_code) {
      return { director: null, filmPreview: null, runtime: null }
    }

    const director: string = attachDirector(res.credits)
    const filmPreview: string = attachFilmPreview(res.videos)
    const runtime: number = res.runtime ? res.runtime : null
    return { director, filmPreview, runtime }
  }
  catch(err) {
    console.error(err)
    return { director: null, filmPreview: null, runtime: null }
  }
}

/**
 * @param {string} type
 * @param {string} id
 */
export const fetchExtrasInfo = async (type: string, id: string) => {
  try {
    const method = 'GET'
    const url = `${type}/${id}?api_key=${API_KEY}`
    return await request(url, { method })
  }
  catch(err) {
    console.error(err)
  }
}

export const request = async (endpoint: string, options = {}) => {
  const { method }: any = options
  const url = `${MOVIE_DB_URL}/${endpoint}`
  try {
    const res = await fetch(url, { method, headers: HTTP_HEADER })
    return res.json()
  }
  catch(err) {
    console.error('request error')
  }
}