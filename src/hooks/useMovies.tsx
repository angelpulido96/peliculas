import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterface';

interface MovieState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upComing: Movie[];
}

export const useMovies = () => {
  
    const [isLoading, setIsLoading] = useState(true)
    const [ moviesState, setMoviesState ] = useState<MovieState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upComing: []
    })

    const getMovies = async () => {

        const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing');
        const popularPromise    = movieDB.get<MovieDBMoviesResponse>('/popular');
        const topRatedPromise   = movieDB.get<MovieDBMoviesResponse>('/top_rated');
        const upComingPromise   = movieDB.get<MovieDBMoviesResponse>('/upcoming');

        const reps = await Promise.all([
            nowPlayingPromise, 
            popularPromise, 
            topRatedPromise, 
            upComingPromise
        ])

       setMoviesState({
        nowPlaying: reps[0].data.results,
        popular: reps[1].data.results,
        topRated: reps[2].data.results,
        upComing: reps[3].data.results,
    })

        setIsLoading( false );
    }

    useEffect(() => {
        // now_playing
        getMovies();
      }, [])
  
    return {
        ...moviesState ,
        isLoading
    }
}
