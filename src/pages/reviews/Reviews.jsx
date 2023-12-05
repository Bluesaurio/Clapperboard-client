import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import { Rating } from "react-simple-star-rating";

function Reviews() {
  const params = useParams();
  const redirect = useNavigate();
  const [allUserReviews, setAllUserReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isThisEditable, setIsThisEditable] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState(null);

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
    setReviewText(e.target.value);
  };

  const handleRating = (rate) => {
    console.log(rate);
    setRating(rate);
  };

  const handleSubmit = (reviewId) => {};

  const handleChangeIsEditable = (reviewId) => {
    // para limpiar los campos de estados de reseñàs a editar al cambier de edit o cerrar edit
    setRating(null);
    setReviewText(null);
    setIsThisEditable(reviewId);
  };

  if (isLoading) {
    return <h3>Searching</h3>;
  }
  // Así queda el return
  return (
    <div>
      {allUserReviews.map((eachReview, index) => {
        console.log(eachReview.rating);
        return (
          <div key={eachReview._id}>
            {isThisEditable == eachReview._id ? (
              <div>
                <Rating
                  onClick={handleRating}
                  initialValue={eachReview.rating}
                />
                <form onSubmit={() => handleSubmit(eachReview._id)}>
                  <textarea
                    name={eachReview.text}
                    cols="30"
                    rows="10"
                    onChange={handleReviewText}
                    defaultValue={eachReview.text}
                  ></textarea>
                </form>
                <div>
                  <button>Submit changes</button>
                  <br />
                  <button onClick={() => handleChangeIsEditable(null)}>
                    Back
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>{eachReview.rating}</p>
                <p>{eachReview.text}</p>
                <button onClick={() => handleChangeIsEditable(eachReview._id)}>
                  Editar
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Reviews;
