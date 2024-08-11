import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import redHeart from '../redHeart.svg';

export default function MovieDetails() {
    const { id } = useParams();
    const favMovieListStore = JSON.parse(localStorage.getItem('favMovieList'));
    const filterData = favMovieListStore ? favMovieListStore.filter((it)=>it.imdbID === id) : []
    const movieData = filterData[0];
    const URL = `https://www.omdbapi.com/?i=${id}&apikey=ece92585&type=movie`;
    const [movieList, setMovieList] = useState([])
    const getMovies = async () => {
        const response = await fetch(URL);
        const movieDetails = await response.json();
        setMovieList(movieDetails)
    }
    useEffect(() => {
        getMovies()
    }, [])
    return (
        <>
        <h1 className='headingLabel'>Movie Details</h1>
        <div className='grid marL15'>
                <div className='col-item'>
                   { movieData && movieData.isFavorite  && <img src={redHeart} alt="fav-icon"  className='favIcon'/> }
                    <img className='imgCardDetails' src={movieList.Poster} alt={movieList.Title} />
                </div>
                <div className='movie-card-details'>
                    <p>
                        {movieList.Title}
                        <br></br>
                    </p>
                    <p>
                    <label>Year : </label>
                    <span className='year'>{movieList.Year}</span>
                    </p>
                     {movieList.Released && <p>
                    <label>Released : </label>
                    <span className='year'>{movieList.Released}</span>
                    </p>}
                    {movieList.Writer &&  <p>
                    <label>Writer : </label>
                    <span className='year'>{movieList.Writer}</span>
                    </p> }
                    {movieList.imdbRating && <p>
                        <label>Rating : </label>
                        <span className='year'>{movieList.imdbRating}</span>
                    </p>}
                </div>
            </div>
        <div className='backHome'>
            <a href='/' className='yearMovie'>Home Page</a>
        </div>
        </>
    )
}
