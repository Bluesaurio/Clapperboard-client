import { useEffect, useState } from "react";
import service from "../services/config";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

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
    return (
      <div
        style={{
          paddingTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BeatLoader color="orange" size={25} />
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      {popularMovies.map((eachMovie) => (
        <Link
          to={`movie/${eachMovie.id}/details`}
          key={eachMovie.id}
          className="movie-item"
        >
          <img
            src={`https://www.themoviedb.org/t/p/w200/${eachMovie.poster_path}`}
            alt={eachMovie.title}
            className="movie-image"
          />
          <div className="movie-title-container">
            <p className="movie-title">{eachMovie.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;
