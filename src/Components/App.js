// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;




import React, { useReducer, useEffect } from 'react';
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=3080ccf8"; // you should replace this with yours

const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MOVIES_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case "SEARCH_MOVIES_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case "SEARCH_MOVIES_FAILURE":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };
        default:
            return state;
    }
};

const App =()=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {

                dispatch({
                    type: "SEARCH_MOVIES_SUCCESS",
                    payload: jsonResponse.Search
                });
            });
    }, []);

    const search =searchValue =>{
        dispatch({
            type: "SEARCH_MOVIES_REQUEST"
        });


        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=3080ccf8`)
            .then(response=> response.json())
            .then(jsonResponse=>{
                if (jsonResponse.Response ==="True"){
                    dispatch({
                        type: "SEARCH_MOVIES_SUCCESS",
                        payload: jsonResponse.Search
                    });
                }else{
                    dispatch({
                        type: "SEARCH_MOVIES_FAILURE",
                        error: jsonResponse.Error
                    });
                }
            });
    };
        const { movies, errorMessage, loading } = state;

        return (
            <div className="App">
                <Header text="Deni movies" />
                <Search search={search} />
                <p className="App-intro">These are some of my favourite movies</p>
                <div className="movies">
                    {loading && !errorMessage ? (
                        <span>loading... </span>
                    ) : errorMessage ? (
                        <div className="errorMessage">{errorMessage}</div>
                    ) : (
                        movies.map((movie, index) => (
                            <Movie key={`${index}-${movie.Title}`} movie={movie} />
                        ))
                    )}
                </div>
            </div>
        );
    };





export default App;