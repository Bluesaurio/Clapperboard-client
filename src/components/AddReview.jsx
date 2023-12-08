import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import { Rating } from "react-simple-star-rating";

//Bootstrap
import { Row, Col, Button } from "react-bootstrap";

function AddReview(props) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const params = useParams();
  const redirect = useNavigate();

  const handleReviewText = (e) => {
    setReviewText(e.target.value);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filmReview = { rating, text: reviewText };
    try {
      const response = await service.post(
        `/review/${params.movieId}`,
        filmReview
      );
      props.getData();
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} style={{ marginBottom: "15px" }}>
            <h4>Add a review</h4>
          </Col>
          <Col xs={12} style={{ marginBottom: "15px" }}>
            <Rating onClick={handleRating} />
          </Col>
          <Col xs={12} style={{ marginBottom: "15px", fontSize: "16px" }}>
            <textarea
              rows="10"
              cols="35"
              onChange={handleReviewText}
              value={reviewText}
            />
          </Col>
          <Col xs={12}>
            <Button
              variant="light"
              type="submit"
              style={{ backgroundColor: "#fdb14d" }}
              disabled={!reviewText || !rating}
            >
              Publish
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default AddReview;
