import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import { Rating } from "react-simple-star-rating";

function Reviews() {
  const params = useParams();
  const redirect = useNavigate();
  const [allUserReviews, setAllUserReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isThisEditable, setIsThisEditable] = useState(false);
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

  const handleChangeIsEditable = () => {
    setIsThisEditable(!isThisEditable);
  };

  if (isLoading) {
    return <h3>Searching</h3>;
  }

  return (
    <div>
      {allUserReviews.map((eachReview) => {
        return (
          <div>
            {isThisEditable === false ? (
              <p>{eachReview.rating}</p>
            ) : (
              <Rating onClick={handleRating} value={rating} />
            )}
            {isThisEditable === false ? (
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

            {isThisEditable === false ? (
              <button onClick={handleChangeIsEditable}>Editar</button>
            ) : (
              <div>
                <button>Submit changes</button>
                <br />
                <button onClick={handleChangeIsEditable}>Back</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Reviews;
