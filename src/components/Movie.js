import React, { useEffect, useState } from 'react'
import redHeart from '../redHeart.svg';
import { Navigate } from 'react-router-dom';

export default function Movie() {
    const URL = 'https://www.omdbapi.com/?s=rom&&apikey=ece92585&type=movie';
    const favMovieListStore = JSON.parse(localStorage.getItem('favMovieList'));
    const token = localStorage.getItem('token');
    const UserName = localStorage.getItem('userName');
    const [redirect, setRedirect] = useState(false)
    const [movieList, setMovieList] = useState(favMovieListStore ? favMovieListStore : []);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('');
    const getMovies = async () => {
        const response = await fetch(URL);
        const movieDetails = await response.json();
        setMovieList(movieDetails.Search)
    }
    let arrFilterKey = ["Title", "Year"] 
    let filteredItems = movieList.filter((movie) =>
        arrFilterKey.some((key)=> movie[key].toLocaleLowerCase().includes(query.toLocaleLowerCase())))
    if(sort === 'favourite'){
        filteredItems =movieList.filter((it)=> it.isFavorite?  (it.isFavorite=== true) : false)
    }
    if(sort === 'date'){
        filteredItems = movieList.sort((a, b) => a.Year - b.Year)
    }

    const saveToLocalStorage = (favMovieList) =>{
        localStorage.setItem('favMovieList',JSON.stringify(favMovieList));
    }
    const handleChangFav = (e, id)=>{
        let favMovieList = movieList.map((it)=>{
            if(it.imdbID === id){
                it['isFavorite'] = !it.isFavorite;
            }
            return it;
        })
        setMovieList(favMovieList);
        saveToLocalStorage(favMovieList);
    }
    const handleSessionOut = ()=>{
        let res = window.confirm("Are you sure want to logout.");
        if(res){
            localStorage.removeItem("token");
            setRedirect(true)
        }
    }
    useEffect(() => {
        if(token == null){
            setRedirect(true)
        }
        if(movieList.length === 0){
            getMovies()
        }
    }, [])
    return (
        <>  {redirect && <Navigate to="/register" /> }
        <header>
            <label className='headingLabel'>Movie App</label>
            <input type='text'className='searchInput' placeholder='Find your favourite one'
            onChange={(e)=>setQuery(e.target.value)} autoFocus/>
            <select className='sortSelect' onChange={(e)=>setSort(e.target.value)}>
                <option value=""> Select</option>
                <option value="favourite"> Favourite Movie</option>
                <option value="date"> Date</option>
            </select>
            <span className='userName'>Hi {UserName}</span>
            <button className='logout' onClick={()=>handleSessionOut()}>Logout</button>
        </header>
        <div className='grid'>
                {filteredItems && filteredItems.map((data, i) => {
                    return (<div key={i} >
                            { data.isFavorite  && <img src={redHeart} alt="fav-icon"  className='favIcon'/> }
                            <input type='checkbox' className='favCheckbox' checked={!!data.isFavorite} onChange={(e)=>handleChangFav(e,data.imdbID)}/>
                            <img className='imgCard' src={data.Poster} alt={data.Title} />
                        <a href={'movie/'+ data.imdbID} >
                            <p className='yearMovie'>
                            <label>{data.Title}</label>
                            <br></br>
                            Year : <span>{data.Year}</span>
                            </p>
                        </a>
                    </div>)
                })}
        </div>
        </>
    )
}
