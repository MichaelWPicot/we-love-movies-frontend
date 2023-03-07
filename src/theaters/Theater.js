import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listMovies} from "../utils/api";


function Theater({ theater, movieList }) {
  const [movies, setMovies] = useState([theater.movies]);
  const [allMovies, setAllMovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    const abortController = new AbortController();
    listMovies(abortController.signal).then(setAllMovies).catch(setError).then(
    movies.forEach((ele, index) => {
      let x = movies
      x[index] = allMovies.find((movie)=> movie.title=== ele.title)
      setMovies(x)
    }));
    return () => abortController.abort();
  }, []);
  
  console.log("Boop",movieList)
  return (
    <article className="col-12 mb-4">
       <div className="row">
        <aside className="col">
          <h2>{theater.name}</h2>
          <address>
            {theater.address_line_1}
            <br />
            {theater.address_line_2 ? theater.address_line_2 : null}
            {theater.city}, {theater.state} {theater.zip}
          </address>
        </aside>
        <section className="col">
          <div className="row">
            {movieList.map((movie) => (
              <div key={movie.movie_id} className="col-2">
                <Link to={`/movies/${movie.movie_id}`}>
                  <img
                    alt={`${movie.title} Poster`}
                    src={movie.image_url}
                    className="w-100"
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export default Theater;
