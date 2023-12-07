import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import { Rating } from "react-simple-star-rating";
import { BeatLoader } from "react-spinners";
import ImageApi from "../../components/ImageApi";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Reviews() {
  const params = useParams();
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);

  const [allUserReviews, setAllUserReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [idToEdit, setIdToEdit] = useState(null);
  const [rating, setRating] = useState(null);
  const [text, setText] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/profile/${params.userId}/reviews`);
      console.log(response.data);
      setAllUserReviews(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
  };

  const handleReviewText = (e) => {
    setText(e.target.value);
  };

  const handleRating = (rate) => {
    console.log(rate);
    setRating(rate);
  };

  const handleSubmit = async (e, reviewId) => {
    e.preventDefault();

    const updatedReview = {
      rating,
      text,
    };

    console.log("Este es el updated", updatedReview);

    try {
      await service.put(`/review/${reviewId}`, updatedReview);

      getData();
      setRating(null);
      setText(null);
      setIdToEdit(null);
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
  };

  const handleDelete = async (index, reviewId) => {
    console.log(index);
    try {
      await service.delete(`/review/${reviewId}`);
      getData();
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
  };

  const handleChangeIsEditable = (reviewId) => {
    // para limpiar los campos de estados de reseñàs a editar al cambier de edit o cerrar edit
    setRating(null);
    setText(null);
    setIdToEdit(reviewId);
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
    <div>
      {allUserReviews.map((eachReview, index) => {
        console.log(eachReview);
        return (
          <div key={eachReview._id}>
            {idToEdit == eachReview._id && (
              <div>
                <Rating
                  onClick={handleRating}
                  initialValue={eachReview.rating}
                />
                <form
                  className="review-form"
                  onSubmit={(e) => handleSubmit(e, eachReview._id)}
                >
                  <textarea
                    className="textarea-container"
                    name={eachReview.text}
                    cols="30"
                    rows="10"
                    onChange={handleReviewText}
                    defaultValue={eachReview.text}
                  ></textarea>
                  <Button
                    disabled={!text || !rating}
                    type="submit"
                    variant="success"
                    className="buttons-review"
                  >
                    Submit changes
                  </Button>
                  <Button
                    onClick={() => handleChangeIsEditable(null)}
                    variant="light"
                    className="buttons-review"
                  >
                    Back
                  </Button>
                  <br />
                </form>
              </div>
            )}
            {idToEdit !== eachReview._id && (
              <div>
                {eachReview.rating === 5 && <p>⭐⭐⭐⭐⭐</p>}
                {eachReview.rating === 4 && <p>⭐⭐⭐⭐</p>}
                {eachReview.rating === 3 && <p>⭐⭐⭐</p>}
                {eachReview.rating === 2 && <p>⭐⭐</p>}
                {eachReview.rating === 1 && <p>⭐</p>}
                <p>
                  {" "}
                  <strong>Review:</strong>
                  <br />
                  {eachReview.text}
                </p>
                <Link to={`/movie/${eachReview.filmId}/details`}>
                  <ImageApi
                    path={eachReview.picture}
                    alt={eachReview.title}
                    className="review-image"
                  />
                </Link>
              </div>
            )}
            {loggedUser._id === params.userId && (
              <div className="buttons-review">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#fdb14d",
                    border: "1px solid white",
                    color: "black",
                    margin: "10px",
                  }}
                  onClick={() => handleChangeIsEditable(eachReview._id)}
                >
                  Edit review
                </Button>

                <Button
                  variant="danger"
                  type="submit"
                  style={{ border: "1px solid white", margin: "10px" }}
                  onClick={() => handleDelete(eachReview._id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Reviews;
