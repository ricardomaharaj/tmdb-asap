import { api_key } from './token.json'
import axios from "axios";
const API = 'https://api.themoviedb.org/3'

export interface Find {
    page?: number
    results?: [{
        poster_path?: string
        popularity?: number
        id?: number
        overview?: string
        backdrop_path?: string
        vote_average?: number
        media_type?: string
        first_air_date?: string
        origin_country?: string[]
        genre_ids?: number[]
        original_language?: string
        vote_count?: number
        name?: string
        original_name?: string
        adult?: boolean
        release_date?: string
        original_title?: string
        title?: string
        video?: boolean
        profile_path?: string
    }]
    total_results?: number
    total_pages?: number
}

export interface Movie {
    adult?: boolean
    backdrop_path?: string
    budget?: number
    genres?: [{
        id?: number
        name?: string
    }]
    homepage?: string
    id?: number
    imdb_id?: string
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: number
    poster_path?: string
    production_companies?: [{
        id?: number
        logo_path?: string
        name?: string
        origin_country?: string
    }]
    production_countries?: [{
        iso_3166_1?: string
        name?: string
    }]
    release_date?: string
    revenue?: number
    runtime?: number
    spoken_languages?: [{
        iso_639_1?: string
        name?: string
    }]
    status?: string
    tagline?: string
    title?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
    credits?: {
        id?: number
        cast?: [{
            adult?: boolean
            gender?: number
            id?: number
            known_for_department?: string
            name?: string
            original_name?: string
            popularity?: number
            profile_path?: string
            cast_id?: number
            character?: string
            credit_id?: string
            order?: number
        }]
        crew?: [{
            adult?: boolean
            gender?: number
            id?: number
            known_for_department?: string
            name?: string
            original_name?: string
            popularity?: number
            profile_path?: string
            credit_id?: string
            department?: string
            job?: string
        }]
    }
    images?: {
        id?: number
        backdrops?: [{
            aspect_ratio?: number
            file_path?: string
            height?: number
            iso_639_1?: string
            vote_average?: number
            vote_count?: number
            width?: number
        }]
        posters?: [{
            aspect_ratio?: number
            file_path?: string
            height?: number
            iso_639_1?: string
            vote_average?: number
            vote_count?: number
            width?: number
        }]
    }
    release_dates?: {
        id?: number
        results?: [{
            iso_3166_1?: string
            release_dates?: [{
                certification?: string
                iso_639_1?: string
                release_date?: string
                type?: number
                note?: string
            }]
        }]
    }
    videos?: {
        id?: number
        results?: [{
            iso_639_1?: string
            iso_3166_1?: string
            name?: string
            key?: string
            site?: string
            size?: number
            type?: string
            official?: boolean
            published_at?: string
            id?: string
        }]
    }
}

export interface Show {
    backdrop_path?: string
    created_by?: [{
        id?: number
        credit_id?: string
        name?: string
        gender?: number
        profile_path?: string
    }]
    episode_run_time?: number[]
    first_air_date?: string
    genres?: [{
        id?: number
        name?: string
    }]
    homepage?: string
    id?: number
    in_production?: boolean
    languages?: string[]
    last_air_date?: string
    last_episode_to_air?: {
        air_date?: string
        episode_number?: number
        id?: number
        name?: string
        overview?: string
        production_code?: string
        season_number?: number
        still_path?: string
        vote_average?: number
        vote_count?: number
    }
    name?: string
    networks?: [{
        name?: string
        id?: number
        logo_path?: string
        origin_country?: string
    }]
    number_of_episodes?: number
    number_of_seasons?: number
    origin_country?: string[]
    original_language?: string
    original_name?: string
    overview?: string
    popularity?: number
    poster_path?: string
    production_companies?: [{
        id?: number
        logo_path?: string
        name?: string
        origin_country?: string
    }]
    production_countries?: [{
        iso_3166_1?: string
        name?: string
    }]
    seasons?: [{
        air_date?: string
        episode_count?: number
        id?: number
        name?: string
        overview?: string
        poster_path?: string
        season_number?: number
    }]
    spoken_languages?: [{
        english_name?: string
        iso_639_1?: string
        name?: string
    }]
    status?: string
    tagline?: string
    type?: string
    vote_average?: number
    vote_count?: number
    credits?: {
        cast?: [{
            adult?: boolean
            gender?: number
            id?: number
            known_for_department?: string
            name?: string
            original_name?: string
            popularity?: number
            profile_path?: string
            character?: string
            credit_id?: string
            order?: number
        }]
        crew?: [{
            adult?: boolean
            gender?: number
            id?: number
            known_for_department?: string
            name?: string
            original_name?: string
            popularity?: number
            profile_path?: string
            credit_id?: string
            department?: string
            job?: string
        }]
        id?: number
    }
    images?: {
        backdrops?: [{
            aspect_ratio?: number
            file_path?: string
            height?: number
            iso_639_1?: string
            vote_average?: number
            vote_count?: number
            width?: number
        }]
        id?: number
        posters?: [{
            aspect_ratio?: number
            file_path?: string
            height?: number
            iso_639_1?: string
            vote_average?: number
            vote_count?: number
            width?: number
        }]
    }
    videos?: {
        id?: number
        results?: [{
            iso_639_1?: string
            iso_3166_1?: string
            name?: string
            key?: string
            site?: string
            size?: number
            type?: string
            official?: boolean
            published_at?: string
            id?: string
        }]
    }
}

export interface Season {
    _id?: string
    air_date?: string
    episodes?: [{
        air_date?: string
        episode_number?: number
        crew?: [{
            department?: string
            job?: string
            credit_id?: string
            adult?: boolean
            gender?: number
            id?: number
            known_for_department?: string
            name?: string
            original_name?: string
            popularity?: number
            profile_path?: string
        }]
        guest_stars?: [{
            credit_id?: string
            order?: number
            character?: string
            adult?: boolean
            gender?: number
            id?: number
            known_for_department?: string
            name?: string
            original_name?: string
            popularity?: number
            profile_path?: string
        }]
        id?: number
        name?: string
        overview?: string
        production_code?: string
        season_number?: number
        still_path?: string
        vote_average?: number
        vote_count?: number
    }]
    name?: string
    overview?: string
    id?: number
    poster_path?: string
    season_number?: number
    credits?: {
        cast?: [{
            adult?: boolean
            gender?: number
            id?: number
            known_for_department?: string
            name?: string
            original_name?: string
            popularity?: number
            profile_path?: string
            character?: string
            credit_id?: string
            order?: number
        }]
        crew?: [{
            adult?: boolean
            gender?: number
            id?: number
            known_for_department?: string
            name?: string
            original_name?: string
            popularity?: number
            profile_path?: string
            credit_id?: string
            department?: string
            job?: string
        }]
        id?: number
    }
    images?: {
        id?: number
        posters?: [{
            aspect_ratio?: number
            file_path?: string
            height?: number
            iso_639_1?: string
            vote_average?: number
            vote_count?: number
            width?: number
        }]
    }
    videos?: {
        id?: number
        results?: [{
            iso_639_1?: string
            iso_3166_1?: string
            name?: string
            key?: string
            site?: string
            size?: number
            type?: string
            official?: boolean
            published_at?: string
            id?: string
        }]
    }
}

export interface Episode {
    air_date?: string
    crew?: [{
        id?: number
        credit_id?: string
        name?: string
        department?: string
        job?: string
        profile_path?: string
    }]
    episode_number?: number
    guest_stars?: [{
        id?: number
        name?: string
        credit_id?: string
        character?: string
        order?: number
        profile_path?: string
    }]
    name?: string
    overview?: string
    id?: number
    production_code?: string
    season_number?: number
    still_path?: string
    vote_average?: number
    vote_count?: number
}

export const getResults = async (query: string, page: number) => {
    let x = await axios.get<Find>(`${API}/search/multi`, { params: { api_key, query, page } })
    return x.data
}

export const getMovie = async (id: number) => {
    let x = await axios.get<Movie>(`${API}/movie/${id}`, {
        params: {
            api_key,
            append_to_response: 'credits,images,videos,release_dates'
        }
    })
    return x.data
}

export const getShow = async (id: number) => {
    let x = await axios.get<Show>(`${API}/tv/${id}`, {
        params: {
            api_key,
            append_to_response: 'credits,images,videos'
        }
    })
    return x.data
}

export const getSeason = async (id: number, season_number: number) => {
    let x = await axios.get<Season>(`${API}/tv/${id}/season/${season_number}`, {
        params: {
            api_key,
            append_to_response: 'credits,images,videos'
        }
    })
    return x.data
}

export const getEpisode = async (id: number, season_number: number, episode_number: number) => {
    let x = await axios.get<Episode>(`${API}/tv/${id}/season/${season_number}/episode/${episode_number}`, { params: { api_key } })
    return x.data
}
