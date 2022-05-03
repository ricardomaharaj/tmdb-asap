import { useState } from 'preact/hooks'
import { token } from './token.json'

const longimg = 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2'
const wideimg = 'https://www.themoviedb.org/t/p/w227_and_h127_bestv2'
const apiurl = 'https://api.themoviedb.org/3'

const ReleaseTypes = [
    '',
    'Premiere',
    'Theatrical (limited)',
    'Theatrical',
    'Digital',
    'Physical',
    'TV'
]

const fetcher = (url) => fetch(url).then(x => x.json())

export function App() {

    let [state, setState] = useState({
        tab: 0,
        subTab: 0,
        results: [{
            id: 0,
            name: '',
            date: '',
            img: '',
            media_type: ''
        }],
        movie: {
            backdrop_path: '',
            budget: 0,
            homepage: '',
            id: 0,
            imdb_id: '',
            original_language: '',
            original_title: '',
            overview: '',
            popularity: 0,
            poster_path: '',
            release_date: '',
            revenue: 0,
            runtime: 0,
            status: '',
            tagline: '',
            title: '',
            vote_average: 0,
            vote_count: 0,
            genres: [{ name: '' }],
            production_companies: [{ name: '', }],
            spoken_languages: [{ name: '' }],
            credits: {
                cast: [{
                    id: 0,
                    name: '',
                    profile_path: '',
                    character: '',
                }]
            },
            release_dates: {
                results: [{
                    iso_3166_1: '',
                    release_dates: [{
                        release_date: '',
                        type: ''
                    }]
                }]
            }
        },
        tv: {
            first_air_date: '',
            homepage: '',
            id: 0,
            last_air_date: '',
            name: '',
            number_of_episodes: 0,
            number_of_seasons: 0,
            original_language: '',
            original_name: '',
            overview: '',
            popularity: 0,
            poster_path: '',
            status: '',
            tagline: '',
            type: '',
            vote_average: 0,
            vote_count: 0,
            episode_run_time: [0],
            languages: [''],
            origin_country: [''],
            genres: [{ name: '' }],
            networks: [{ name: '' }],
            production_companies: [{ name: '' }],
            seasons: [{
                air_date: '',
                episode_count: 0,
                name: '',
                overview: '',
                poster_path: '',
                season_number: 0
            }],
        },
        season: {
            air_date: '',
            episodes: [{
                air_date: '',
                episode_number: 0,
                name: '',
                overview: '',
                season_number: 0,
                still_path: '',
                vote_average: 0,
                vote_count: 0,
            }],
            name: '',
            overview: '',
            poster_path: '',
            season_number: 0,
            credits: {
                cast: [{
                    id: 0,
                    name: '',
                    profile_path: '',
                    character: '',
                }]
            },
        }
    })

    let updateState = (update) => setState({ ...state, ...update })

    let find = async (query) => {
        if (!query) return
        let x = await fetcher(`${apiurl}/search/multi?api_key=${token}&query=${query}`)
        x = x.results.map((x) => {
            return {
                name: x.name || x.title,
                date: x.release_date || x.first_air_date,
                img: x.poster_path || x.profile_path,
                ...x
            }
        })
        updateState({ results: x })
    }

    let setMedia = (type, id) => {
        type == 'tv' ? tv(id) : movie(id)
    }

    let movie = async (id) => {
        let x = await fetcher(`${apiurl}/movie/${id}?api_key=${token}&append_to_response=credits,release_dates`)
        updateState({ movie: x, tab: 1, subTab: 0 })
    }

    let tv = async (id) => {
        let x = await fetcher(`${apiurl}/tv/${id}?api_key=${token}`)
        updateState({ tv: x, tab: 2, subTab: 0 })
    }

    let season = async (seasonNum) => {
        let x = await fetcher(`${apiurl}/tv/${state.tv.id}/season/${seasonNum}?api_key=${token}&append_to_response=credits`)
        updateState({ season: x, tab: 3, subTab: 0 })
    }

    return <div className='col'>
        <div onClick={() => updateState({ tab: 0 })} className='row' style={{ justifyContent: 'center' }}>
            <div>TMDB ASAP</div>
        </div>
        {state.tab == 0 && <>
            <div className='row'>
                <input type='text' onKeyDown={e => e.key == 'Enter' ? find(e.target.value) : null} />
            </div>
            {state.results.map((x) => <div className='row' onClick={() => setMedia(x.media_type, x.id)}>
                {x.img && <>
                    <div className='col'>
                        <img src={longimg + x.img} alt='' />
                    </div>
                </>}
                <div className='col'>
                    <div> {x.date} </div>
                    <div> {x.name} </div>
                </div>
            </div>
            )}
        </>}
        {state.tab == 1 && <>
            <div className='row'>
                <div onClick={() => updateState({ tab: 0 })}> BACK </div>
            </div>
            <div className='row'>
                {state.movie.poster_path && <>
                    <div className='col'>
                        <img src={longimg + state.movie.poster_path} alt='' />
                    </div>
                </>}
                <div className='col'>
                    <div> {state.movie.release_date} </div>
                    <div> {state.movie.title} </div>
                    <div> {state.movie.tagline} </div>
                </div>
            </div>
            <div className='row'>
                <div onClick={() => updateState({ subTab: 0 })} > INFO </div>
                <div onClick={() => updateState({ subTab: 1 })} > CAST </div>
            </div>
            {state.subTab == 0 && <>
                <hr />
                <div> {state.movie.overview} </div>
                <hr />
                <div> status: {state.movie.status} </div>
                <div> budget: {state.movie.budget.toLocaleString()} </div>
                <div> revenue: {state.movie.revenue.toLocaleString()} </div>
                <div> imdb_id: {state.movie.imdb_id} </div>
                <div> original_language: {state.movie.original_language} </div>
                <div> original_title: {state.movie.original_title} </div>
                <div> popularity: {state.movie.popularity} </div>
                <div> runtime: {state.movie.runtime}m </div>
                <div> vote_average: {state.movie.vote_average} </div>

                <div> release_dates: {state.movie.release_dates.results.filter(x => x.iso_3166_1 == 'US')[0].release_dates.map(x => <>
                    <div> {new Date(x.release_date.substring(0, 10).replace('-', '/')).toDateString().substring(4)} {ReleaseTypes[x.type]} </div>
                </>)}
                </div>

                <div> genres: {state.movie.genres.map(x => <div> {x.name} </div>)} </div>
                <div> production_companies: {state.movie.production_companies.map(x => <div> {x.name} </div>)} </div>
                <div> spoken_languages: {state.movie.spoken_languages.map(x => <div> {x.name} </div>)} </div>
            </>}
            {state.subTab == 1 && <>
                {state.movie.credits.cast.map(x => <>
                    <div className='row'>
                        {x.profile_path && <>
                            <div className='col'>
                                <img src={longimg + x.profile_path} alt='' />
                            </div>
                        </>}
                        <div className='col'>
                            <div> {x.name} </div>
                            <div> {x.character} </div>
                        </div>
                    </div>
                </>)}
            </>}
        </>}
        {state.tab == 2 && <>
            <div className='row'>
                <div onClick={() => updateState({ tab: 0 })}> BACK </div>
            </div>
            <div className='row'>
                {state.tv.poster_path && <img className='col' src={longimg + state.tv.poster_path} alt='' />}
                <div className='col'>
                    <div> {state.tv.first_air_date} </div>
                    <div> {state.tv.name} </div>
                    <div> {state.tv.tagline} </div>
                </div>
            </div>
            <div className='row'>
                <div onClick={() => updateState({ subTab: 0 })}> INFO </div>
                <div onClick={() => updateState({ subTab: 1 })}> SEASONS </div>
            </div>
            {state.subTab == 0 && <>
                <hr />
                <div> {state.tv.overview} </div>
                <hr />
                <div> status: {state.tv.status} </div>
                <div> type: {state.tv.type} </div>
                <div> episode_run_time: {state.tv.episode_run_time[0]}m </div>
                <div> number_of_seasons: {state.tv.number_of_seasons} </div>
                <div> number_of_episodes: {state.tv.number_of_episodes} </div>
                <div> original_language: {state.tv.original_language} </div>
                <div> original_name: {state.tv.original_name} </div>
                <div> popularity: {state.tv.popularity} </div>
                <div> vote_average: {state.tv.vote_average} </div>

                <div> languages: {state.tv.languages.map(x => <div> {x} </div>)} </div>
                <div> origin_country: {state.tv.origin_country.map(x => <div> {x} </div>)} </div>
                <div> genres: {state.tv.genres.map(x => <div> {x.name} </div>)} </div>
                <div> networks: {state.tv.networks.map(x => <div> {x.name} </div>)} </div>
                <div> production_companies: {state.tv.production_companies.map(x => <div> {x.name} </div>)} </div>
            </>}
            {state.subTab == 1 && <>
                {state.tv.seasons.map(x => <>
                    <div className='row' onClick={() => season(x.season_number)} >
                        {x.poster_path && <img className='col' src={longimg + x.poster_path} alt='' />}
                        <div className='col'>
                            <div> {x.air_date} </div>
                            <div> {x.name} </div>
                            <div> {x.episode_count} Episodes </div>
                        </div>
                    </div>
                </>)}
            </>}
        </>}
        {state.tab == 3 && <>
            <div className='row'>
                <div onClick={() => updateState({ tab: 2, subTab: 1 })}> BACK </div>
            </div>
            <div className='row'>
                {state.season.poster_path && <img src={longimg + state.season.poster_path} alt='' className='col' />}
                <div className='col'>
                    <div> {state.season.air_date} </div>
                    <div> {state.season.name} </div>
                </div>
            </div>
            <div className="row">
                <div onClick={() => updateState({ subTab: 0 })}> EPISODES </div>
                <div onClick={() => updateState({ subTab: 1 })}> CAST </div>
            </div>
            {state.subTab == 0 && <>
                {state.season.episodes.map(x => <>
                    {x.still_path && <div className='row'>
                        <img src={wideimg + x.still_path} alt='' />
                    </div>}
                    <div className='row'>
                        <div> {x.episode_number} | {x.name} | {x.air_date} </div>
                    </div>
                    <div className='row'>
                        <div> {x.overview} </div>
                    </div>
                </>)}
            </>}
            {state.subTab == 1 && <>
                {state.season.credits.cast.map(x => <>
                    <div className='row'>
                        {x.profile_path && <>
                            <div className='col'>
                                <img src={longimg + x.profile_path} alt='' />
                            </div>
                        </>}
                        <div className='col'>
                            <div> {x.name} </div>
                            <div> {x.character} </div>
                        </div>
                    </div>
                </>)}
            </>}
        </>}
    </div>
}
