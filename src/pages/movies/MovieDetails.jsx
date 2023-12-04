import { useEffect, useState } from "react";
import service from "../../services/config";
import { Link, useParams } from "react-router-dom";

function MovieDetails() {
  const params = useParams();

  const [movieDetails, setMovieDetails] = useState([null]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/movie/${params.movieId}/details`);
      console.log(response.data);
      setMovieDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h3>Buscando data</h3>;
  }

  return (
    <div>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://www.themoviedb.org/t/p/w200/${movieDetails.poster_path}`}
      ></img>
      <h3>Plot</h3>
      <p>{movieDetails.overview}</p>
      <h3>Genres</h3>
      <ul>
        {movieDetails.genres.map((eachGenre) => {
          return <li key={eachGenre.id}>{eachGenre.name}</li>;
        })}
      </ul>
      <p>Release date: {movieDetails.release_date}</p>
    </div>
  );
}

export default MovieDetails;
