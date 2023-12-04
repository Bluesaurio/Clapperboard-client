import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import { Rating } from "react-simple-star-rating";

function AddReview() {
  const [rating, setRating] = useState(0);
  const redirect = useNavigate();
  const params = useParams();
  const [reviewText, setReviewText] = useState("");

  const handleReviewText = (e) => {
    setReviewText(e.target.value);
  };

  const handleRating = (rate) => {
    console.log(rate);
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filmReview = { rating, text: reviewText };
    console.log(filmReview);
    try {
      const response = await service.post(
        `/review/${params.movieId}`,
        filmReview
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
  };

  return (
    <div>
      <h4>Add a review</h4>
      <form onSubmit={handleSubmit}>
        <Rating onClick={handleRating} />

        <textarea onChange={handleReviewText} value={reviewText} />
        <button>Publish Review</button>
      </form>
    </div>
  );
}

export default AddReview;
