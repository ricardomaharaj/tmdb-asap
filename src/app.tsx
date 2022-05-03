import * as tmdb from './TMDBTypes'
import { useState } from 'preact/hooks'

const IMG = 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2'
const IMGW = 'https://www.themoviedb.org/t/p/w227_and_h127_bestv2'

export function App() {
    let [tab, setTab] = useState(0)
    let [subTab, setSubTab] = useState(0)
    let [results, setResults] = useState<tmdb.Find>()
    let [movie, setMovie] = useState<tmdb.Movie>()
    let [show, setShow] = useState<tmdb.Show>()
    let [season, setSeason] = useState<tmdb.Season>()
    let [episode, setEpisode] = useState<tmdb.Episode>()
    return <>
        <div className='col'>
            <div className='row'>
                <div onClick={() => setTab(0)} > TMDB ASAP </div>
            </div>
            {tab == 0 && <>
                <div className='row'>
                    <input type='text' onKeyDown={async (e) => {
                        if (e.key == 'Enter' && e.currentTarget.value) setResults(await tmdb.getResults(e.currentTarget.value, 1))
                    }} />
                </div>
                {results?.results?.map(x => <>
                    <div className='row' onClick={async (e) => {
                        if (x.media_type == 'movie') { setMovie(await tmdb.getMovie(x.id!)); setTab(1) }
                        if (x.media_type == 'tv') { setShow(await tmdb.getShow(x.id!)); setTab(2) }
                    }} >
                        <div className='col'>
                            <img src={IMG + (x.poster_path || x.profile_path)} alt='' />
                        </div>
                        <div className='col'>
                            <div> {x.first_air_date || x.release_date} </div>
                            <div> {x.name || x.title} </div>
                        </div>
                    </div>
                </>)}
            </>}
            {tab == 1 && <>
                <div className='row'>
                    <div onClick={() => setTab(0)}> BACK </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <img src={IMG + movie?.poster_path} alt='' />
                    </div>
                    <div className='col'>
                        <div> {movie?.release_date} </div>
                        <div> {movie?.title} </div>
                    </div>
                </div>
                <div className='row space-x-2'>
                    {['INFO', 'CAST', 'CREW'].map((x, i) => <div onClick={() => setSubTab(i)} > {x} </div>)}
                </div>
                {subTab == 0 && <>
                    <div> {movie?.overview} </div>
                </>}
                {subTab == 1 && <>
                    {movie?.credits?.cast?.map(x => <>
                        <div className='row'>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                            <div className='col'>
                                <div> {x.name} </div>
                                <div> {x.character} </div>
                            </div>
                        </div>
                    </>)}
                </>}
                {subTab == 2 && <>
                    {movie?.credits?.crew?.map(x => <>
                        <div className='row'>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                            <div className='col'>
                                <div> {x.name} </div>
                                <div> {x.job} </div>
                            </div>
                        </div>
                    </>)}
                </>}
            </>}
            {tab == 2 && <>
                <div className='row'>
                    <div onClick={() => setTab(0)}> BACK </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <img src={IMG + show?.poster_path} alt='' />
                    </div>
                    <div className='col'>
                        <div> {show?.first_air_date} </div>
                        <div> {show?.name} </div>
                    </div>
                </div>
                <div className='row'>
                    {['INFO', 'SEASONS', 'CAST', 'CREW'].map((x, i) => <div onClick={() => setSubTab(i)}> {x} </div>)}
                </div>
                {subTab == 0 && <>
                    <div> {show?.overview} </div>
                </>}
                {subTab == 1 && <>
                    {show?.seasons?.map(x => <>
                        <div className='row' onClick={async () => {
                            setSeason(await tmdb.getSeason(show?.id!, x.season_number!))
                            setTab(3)
                        }}>
                            <div className='col'>
                                <img src={IMG + x.poster_path} alt='' />
                            </div>
                            <div className='col'>
                                <div> {x.name} </div>
                                <div> {x.air_date} </div>
                                <div> {x.episode_count} Episodes </div>
                            </div>
                        </div>
                    </>)}
                </>}
                {subTab == 2 && <>
                    {show?.credits?.cast?.map(x => <>
                        <div className='row'>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                            <div className='col'>
                                <div> {x.name} </div>
                                <div> {x.character} </div>
                            </div>
                        </div>
                    </>)}
                </>}
                {subTab == 3 && <>
                    {show?.credits?.crew?.map(x => <>
                        <div className='row'>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                            <div className='col'>
                                <div> {x.name} </div>
                                <div> {x.job} </div>
                            </div>
                        </div>
                    </>)}
                </>}
            </>}
            {tab == 3 && <>
                <div className='row'>
                    <div onClick={() => setTab(2)}> BACK </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <img src={IMG + season?.poster_path} alt='' />
                    </div>
                    <div className='col'>
                        <div> {season?.air_date} </div>
                        <div> {season?.name} </div>
                    </div>
                </div>
                <div className='row'>
                    {['INFO', 'EPISODES', 'CAST', 'CREW'].map((x, i) => <div onClick={() => setSubTab(i)}> {x} </div>)}
                </div>
                {subTab == 0 && <>
                    <div> {season?.overview} </div>
                </>}
                {subTab == 1 && <>
                    {season?.episodes?.map(x => <>
                        <div className='row' onClick={async () => {
                            setEpisode(await tmdb.getEpisode(show?.id!, x.season_number!, x.episode_number!))
                            setTab(4)
                        }}>
                            <div className='col'>
                                <div>
                                    <img src={IMGW + x.still_path} alt='' />
                                </div>
                                <div> {x.episode_number} | {x.name} | {x.air_date} </div>
                                <div> {x.overview} </div>
                            </div>
                        </div>
                    </>)}
                </>}
                {subTab == 2 && <>
                    {season?.credits?.cast?.map(x => <>
                        <div className='row'>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                            <div className='col'>
                                <div> {x.name} </div>
                                <div> {x.character} </div>
                            </div>
                        </div>
                    </>)}
                </>}
                {subTab == 3 && <>
                    {season?.credits?.crew?.map(x => <>
                        <div className='row'>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                            <div className='col'>
                                <div> {x.name} </div>
                                <div> {x.job} </div>
                            </div>
                        </div>
                    </>)}
                </>}
            </>}
            {tab == 4 && <>
                <div className='row'>
                    <div onClick={() => setTab(3)}> BACK </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <img src={IMGW + episode?.still_path} alt='' />
                        <div> Season {episode?.season_number} Episode {episode?.episode_number} | {episode?.name} </div>
                    </div>
                </div>
                <div className='row'>
                    {['INFO', 'GUESTS', 'CREW'].map((x, i) => <div onClick={() => setSubTab(i)}> {x} </div>)}
                </div>
                {subTab == 0 && <>
                    <div> {episode?.overview} </div>
                </>}
                {subTab == 1 && <>
                    {episode?.guest_stars?.map(x => <>
                        <div className='row'>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                            <div className='col'>
                                <div> {x.name} </div>
                                <div> {x.character} </div>
                            </div>
                        </div>
                    </>)}
                </>}
                {subTab == 2 && <>
                    {episode?.crew?.map(x => <>
                        <div className='row'>
                            <div className='col'>
                                <img src={IMG + x.profile_path} alt='' />
                            </div>
                            <div className='col'>
                                <div> {x.name} </div>
                                <div> {x.job} </div>
                            </div>
                        </div>
                    </>)}
                </>}
            </>}
        </div>
    </>
}
