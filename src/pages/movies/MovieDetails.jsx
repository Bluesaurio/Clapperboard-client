import { useContext, useEffect, useState } from "react";
import service from "../../services/config";
import { Link, useParams } from "react-router-dom";
import AddReview from "../../components/AddReview";
import { AuthContext } from "../../context/auth.context";
import { BeatLoader } from "react-spinners";

//Bootstrap
import { Row, Col } from "react-bootstrap";
import ImageApi from "../../components/ImageApi";

function MovieDetails() {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState([null]);
  const [isLoading, setIsLoading] = useState(true);
  const [allReviews, setAllReviews] = useState(null);
  const [doIHaveAReview, setDoIHaveAReview] = useState(false);
  const { isLoggedIn, loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);
  console.log(allReviews);
  const getData = async () => {
    try {
      const movieResponse = await service.get(
        `/movie/${params.movieId}/details`
      );
      const getReviews = await service.get(`/review/${params.movieId}`);
      if (isLoggedIn) {
        const LookingForMyReviews = await service.get(
          `/review/${params.movieId}/${loggedUser._id}`
        );
        if (!LookingForMyReviews.data) {
          setDoIHaveAReview(false);
        } else {
          setDoIHaveAReview(true);
        }
      }

      setMovieDetails(movieResponse.data);
      setAllReviews(getReviews.data);
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
    <div className="movie-details-container">
      <Row>
        <Col xs={12} md={4}>
          <ImageApi
            path={movieDetails.poster_path}
            alt={movieDetails.title}
            className="img-fluid"
          />
        </Col>

        <Col xs={12} md={4}>
          <h3>{movieDetails.title}</h3>
          {isLoggedIn && !doIHaveAReview && <AddReview getData={getData} />}
          {!isLoggedIn && (
            <p>
              Log in to add your review <Link to={"/login"}>here!</Link>
            </p>
          )}
          {doIHaveAReview && <p>You have already done your Review here!</p>}

          {allReviews.map((eachReview) => (
            <div key={eachReview._id} className="review-box">
              {eachReview.rating === 5 && <p>⭐⭐⭐⭐⭐</p>}
              {eachReview.rating === 4 && <p>⭐⭐⭐⭐</p>}
              {eachReview.rating === 3 && <p>⭐⭐⭐</p>}
              {eachReview.rating === 2 && <p>⭐⭐</p>}
              {eachReview.rating === 1 && <p>⭐</p>}
              <img
                src={eachReview.creatorId.profilePic}
                alt={eachReview.creatorId.username}
                width={100}
              />
              <p>{eachReview.text} </p>
              <p>
                Review by:{" "}
                {eachReview.creatorId._id && (
                  <Link to={`/profile/${eachReview.creatorId._id}`}>
                    {eachReview.creatorId.username}
                  </Link>
                )}
                {!eachReview.creatorId._id && (
                  <Link to={`/login`}>{eachReview.creatorId.username}</Link>
                )}
              </p>
            </div>
          ))}
        </Col>

        <Col xs={12} md={4}>
          <h4>Plot</h4>
          <p>{movieDetails.overview}</p>

          <h4>Genres</h4>
          <ul className="list-unstyled">
            {movieDetails.genres.map((eachGenre) => (
              <li key={eachGenre.id}>{eachGenre.name}</li>
            ))}
          </ul>

          <h4>Release Date</h4>
          <p>{movieDetails.release_date}</p>
        </Col>
      </Row>
    </div>
  );
}

export default MovieDetails;
