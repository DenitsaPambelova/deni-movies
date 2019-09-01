import React from 'react';

const default_placeholder_image="https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
const Movie= ({movie})=>{
    const poster=
        movie.Poster==="N/A"? default_placeholder_image:movie.Poster;
    return(
        <div className="movie">
            <h2>{movie.title}</h2>
            <div>
                <img
                    width="200"
                    alt={`The movie title: ${movie.title}`}
                    src={poster}
                    />
            </div>
            <p>({movie.year})</p>
        </div>
    );
};

export default Movie;
