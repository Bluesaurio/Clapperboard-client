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

      response.data.forEach((eachResponse) => {
        return setRating(eachResponse.rating);
      });
      response.data.forEach((eachResponse) => {
        return setReviewText(eachResponse.text);
      });
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

  const handleChangeIsEditable = (reviewId) => {
    setIsThisEditable(reviewId);
  };

  if (isLoading) {
    return <h3>Searching</h3>;
  }

  return (
    <div>
      {allUserReviews.map((eachReview, index) => {
        return (
          <div>
            {isThisEditable == eachReview._id ? (
              <p>{eachReview.rating}</p>
            ) : (
              <Rating onClick={handleRating} value={rating} />
            )}
            {isThisEditable == eachReview._id ? (
              <p>{eachReview.text}</p>
            ) : (
              <form>
                <textarea
                  name={reviewText}
                  cols="30"
                  rows="10"
                  onChange={handleReviewText}
                  value={reviewText}
                ></textarea>
              </form>
            )}

            {isThisEditable == eachReview._id ? (
              <button onClick={() => handleChangeIsEditable(index)}>
                Editar
              </button>
            ) : (
              <div>
                <button>Submit changes</button>
                <br />
                <button onClick={() => handleChangeIsEditable(index)}>
                  Back
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
