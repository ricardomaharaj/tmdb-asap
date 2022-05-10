import axios from 'axios'
import token from './token.json'

const api = 'https://api.themoviedb.org/3'
const api_key = token.api_key

export const TMDB = {
    find: async function (query) {
        let x = await axios.get(`${api}/search/multi`, {
            params: {
                api_key,
                query,
            }
        })
        return x.data
    },
    movie: async function (id) {
        let x = await axios.get(`${api}/movie/${id}`, {
            params: {
                api_key,
                append_to_response: 'credits,release_dates'
            }
        })
        return x.data
    },
    show: async function (id) {
        let x = await axios.get(`${api}/tv/${id}`, {
            params: {
                api_key,
                append_to_response: 'credits,external_ids'
            }
        })
        return x.data
    },
    person: async function (id) {
        let x = await axios.get(`${api}/person/${id}`, {
            params: {
                api_key,
                append_to_response: 'combined_credits,external_ids'
            }
        })
        return x.data
    },
    season: async function (id, season_number) {
        let x = await axios.get(`${api}/tv/${id}/season/${season_number}`, {
            params: {
                api_key,
                append_to_response: 'credits'
            }
        })
        return x.data
    },
    episode: async function (id, season_number, episode_number) {
        let x = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${episode_number}`, {
            params: {
                api_key
            }
        })
        return x.data
    }
}
