import { useEffect, useState } from "react";
import service from "../../services/config";
import { Link, useParams } from "react-router-dom";
import AddReview from "../../components/AddReview";

function MovieDetails() {
  const params = useParams();

  const [movieDetails, setMovieDetails] = useState([null]);
  const [isLoading, setIsLoading] = useState(true);
  const [allReviews, setAllReviews] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/movie/${params.movieId}/details`);
      const getReviews = await service.get(`/review/${params.movieId}`);
      console.log(response.data);
      setMovieDetails(response.data);
      console.log(getReviews.data);
      setAllReviews(getReviews.data);
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

      {allReviews.map((eachReview) => {
        return (
          <div key={eachReview._id}>
            {eachReview.rating === 5 && <p>⭐⭐⭐⭐⭐</p>}
            {eachReview.rating === 4 && <p>⭐⭐⭐⭐</p>}
            {eachReview.rating === 3 && <p>⭐⭐⭐</p>}
            {eachReview.rating === 2 && <p>⭐⭐</p>}
            {eachReview.rating === 1 && <p>⭐</p>}
            <p>{eachReview.text} </p>
            <p>Review by: {eachReview.creator}</p>
          </div>
        );
      })}

      <AddReview getData={getData} />
    </div>
  );
}

export default MovieDetails;
