import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";

function Reviews() {
  const params = useParams();
  const redirect = useNavigate();
  const [allUserReviews, setAllUserReviews] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/profile/${params.userId}/reviews`);
      console.log(response.data);
      setAllUserReviews(response.data);

      const moviesDetails = [];

      await response.data.forEach(async (eachReview) => {
        try {
          const oneMovie = await service.get(
            `/movie/${eachReview.filmId}/details`
          );
          console.log(oneMovie.data);
          moviesDetails.push(oneMovie.data);
        } catch (error) {
          console.log(error);
          moviesDetails.push(null);
        }
      });

      setMovieData(moviesDetails);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
  };


  if (isLoading) {
    return <h3>Searching</h3>;
  }

  return (
    <div>
      {allUserReviews.map((eachReview) => {
        return (
          <div>
            <p>{eachReview.rating}</p>
            <p>{eachReview.text}</p>
            {movieData.map((eachMovie) => {
              return (
                <img
                  src={`https://www.themoviedb.org/t/p/w200/${eachMovie.poster_path}`}
                />
              );
            })}
            <button onClick={}>Editar</button>
          </div>
        );
      })}
    </div>
  );
}

export default Reviews;
