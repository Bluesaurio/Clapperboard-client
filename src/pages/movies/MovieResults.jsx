import { useEffect, useState } from "react";
import service from "../../services/config";
import { Link, useParams } from "react-router-dom";

function MovieResults() {
  const params = useParams();

  const [moviesFound, setMoviesFound] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/movie/${params.search}/results`);
      console.log(response.data.results);
      setMoviesFound(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h3>Searching</h3>;
  }

  return (
    <div>
      {moviesFound.map((eachMovie) => {
        return (
          <Link key={eachMovie.id} to={`/movie/${eachMovie.id}/details`}>
            <img
              src={`https://www.themoviedb.org/t/p/w200/${eachMovie.poster_path}`}
            ></img>
            <h3>{eachMovie.title}</h3>
          </Link>
        );
      })}
    </div>
  );
}

export default MovieResults;
