import { useEffect, useState } from "react";
import service from "../services/config";
import { Link } from "react-router-dom";

function Home() {
  const [popularMovies, setPopularMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/movie/popular");
      console.log(response.data.results);
      setPopularMovies(response.data.results);
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
      {popularMovies.map((eachMovie) => {
        return (
          <Link to={`movie/${eachMovie.id}/details`} key={eachMovie.id}>
            <img
              src={`https://www.themoviedb.org/t/p/w200/${eachMovie.poster_path}`}
            ></img>
            <p>{eachMovie.title}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Home;
