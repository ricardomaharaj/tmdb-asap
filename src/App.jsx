import { TMDB } from './TMDB'
import { useState } from 'react'

const IMG = 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2'
const IMGW = 'https://www.themoviedb.org/t/p/w227_and_h127_bestv2'

function ImageRow(props) {
    return <div className='row'>
        {props.image && <div className='col'>
            <img src={IMG + props.image} alt='' />
        </div>}
        <div className='col'>
            {props.children}
        </div>
    </div>
}

export function App() {

    let [tab, setTab] = useState(0)
    let [subTab, setSubTab] = useState(0)
    let [results, setResults] = useState([{}])
    let [movie, setMovie] = useState({})
    let [show, setShow] = useState({})
    let [season, setSeason] = useState({})
    let [episode, setEpisode] = useState({})

    return <>
        <div className='col'>
            <div onClick={() => setTab(0)} className='row'>
                <div> TMDB ASAP </div>
            </div>
            {tab === 0 && <>
                <div className='row'>
                    <input type='text' onKeyDown={e => e.key === 'Enter' ? TMDB.find(e.currentTarget.value).then(x => setResults(x.results)) : null} />
                </div>
                {results.map((x, i) =>
                    <div className='row' onClick={() => {
                        switch (x.media_type) {
                            case 'movie':
                                TMDB.movie(x.id)
                                    .then(x => setMovie(x))
                                setTab(1)
                                break
                            case 'tv':
                                TMDB.show(x.id)
                                    .then(x => setShow(x))
                                setTab(2)
                                break
                            default:
                                break
                        }
                    }} key={i}>
                        {(x.poster_path || x.profile_path) && <>
                            <div className='col'>
                                <img src={IMG + (x.poster_path || x.profile_path)} alt='' />
                            </div>
                        </>}
                        <div className='col'>
                            <div> {x.release_date || x.first_air_date} </div>
                            <div> {x.name || x.title} </div>
                        </div>
                    </div>
                )}
            </>}
            {tab === 1 && <>
                <div onClick={() => setTab(0)} className='row'>
                    <div> BACK </div>
                </div>
                <div className='row'>
                    {movie.poster_path && <>
                        <div className='col'>
                            <img src={IMG + movie.poster_path} alt='' />
                        </div>
                    </>}
                    <div className='col'>
                        <div> {movie.release_date} </div>
                        <div> {movie.title} </div>
                    </div>
                </div>
                <div className='row'>
                    {['INFO', 'CAST', 'CREW'].map((x, i) => <div onClick={() => setSubTab(i)} key={i}> {x} </div>)}
                </div>
                {subTab === 0 && <>
                    <div> {movie.overview} </div>
                </>}
                {subTab === 1 && <>
                    {movie.credits.cast.map((x, i) => <div className='row' key={i}>
                        {x.profile_path && <>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                        </>}
                        <div className='col'>
                            <div> {x.name} </div>
                            <div> {x.character} </div>
                        </div>
                    </div>)}
                </>}
                {subTab === 2 && <>
                    {movie.credits.crew.map((x, i) => <div className='row' key={i}>
                        {x.profile_path && <>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                        </>}
                        <div className='col'>
                            <div> {x.name} </div>
                            <div> {x.job} </div>
                        </div>
                    </div>)}
                </>}
            </>}
            {tab === 2 && <>
                <div onClick={() => setTab(0)} className='row'>
                    <div> BACK </div>
                </div>
                <div className='row'>
                    {show.poster_path && <>
                        <div className='col'>
                            <img src={IMG + show.poster_path} alt='' />
                        </div>
                    </>}
                    <div className='col'>
                        <div> {show.first_air_date} </div>
                        <div> {show.title} </div>
                    </div>
                </div>
                <div className='row'>
                    {['INFO', 'SEASONS', 'CAST', 'CREW'].map((x, i) => <div onClick={() => setSubTab(i)} key={i}> {x} </div>)}
                </div>
                {subTab === 0 && <>
                    <div> {show.overview} </div>
                </>}
                {subTab === 1 && <>
                    {show.seasons.map((x, i) =>
                        <div onClick={() => {
                            TMDB.season(show.id, x.season_number)
                                .then(x => setSeason(x))
                            setTab(3)
                        }} className='row' key={i}>
                            {x.poster_path && <>
                                <div className='col'>
                                    <img src={IMG + x.poster_path} alt='' />
                                </div>
                            </>}
                            <div className='col'>
                                <div> {x.air_date} </div>
                                <div> {x.name} </div>
                                <div> {x.episode_count} Episodes </div>
                            </div>
                        </div>
                    )}
                </>}
                {subTab === 2 && <>
                    {show.credits.cast.map((x, i) => <div className='row' key={i}>
                        {x.profile_path && <>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                        </>}
                        <div className='col'>
                            <div> {x.name} </div>
                            <div> {x.character} </div>
                        </div>
                    </div>)}
                </>}
                {subTab === 3 && <>
                    {show.credits.crew.map((x, i) => <div className='row' key={i}>
                        {x.profile_path && <>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                        </>}
                        <div className='col'>
                            <div> {x.name} </div>
                            <div> {x.job} </div>
                        </div>
                    </div>)}
                </>}
            </>}
            {tab === 3 && <>
                <div onClick={() => setTab(2)} className='row'>
                    <div> BACK </div>
                </div>
                <div className='row'>
                    {season.poster_path && <>
                        <div className='col'>
                            <img src={IMG + season.poster_path} alt='' />
                        </div>
                    </>}
                    <div className='col'>
                        <div> {season.air_date} </div>
                        <div> {season.name} </div>
                    </div>
                </div>
                {season.episodes.map((x, i) =>
                    <div onClick={() => {
                        TMDB.episode(show.id, season.season_number, x.episode_number)
                            .then(x => setEpisode(x))
                        setTab(4)
                    }} className='row' key={i}>
                        <div className='col'>
                            {x.still_path && <>
                                <div>
                                    <img src={IMGW + x.still_path} alt='' />
                                </div>
                            </>}
                            <div> {x.episode_number} | {x.name} | {x.air_date} </div>
                        </div>
                    </div>
                )}
            </>}
            {tab === 4 && <>
                <div onClick={() => setTab(3)} className='row'>
                    <div> BACK </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {episode.still_path && <>
                            <div>
                                <img src={IMGW + episode.still_path} alt='' />
                            </div>
                        </>}
                        <div> {episode.episode_number} | {episode.name} | {episode.air_date} </div>
                    </div>
                </div>
            </>}
        </div>
    </>
}
