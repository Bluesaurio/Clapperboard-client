import ReactStars from "react-stars";
import React, { useState } from "react";
import { render } from "react-dom";

function StarRating() {
  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      color2={"#ffd700"}
      value={rating}
    />
  );
}

export default StarRating;
