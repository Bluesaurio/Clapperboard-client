import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Search() {
  const [queryValue, setQueryValue] = useState("");

  const redirect = useNavigate();

  const handleQueryChange = (event) => {
    console.log(event.target.value);
    setQueryValue(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(queryValue);
    if (queryValue) {
      redirect("/");
      redirect(`/movie/${queryValue}/results`);
    }
  };

  return (
<<<<<<< HEAD
    <Form className="d-flex">
=======
    <Form className="d-flex" onSubmit={(e) => handleSearch(e)}>
>>>>>>> 17f38007be98247e7bab5286ae63baee42956b5c
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={handleQueryChange}
        value={queryValue}
      />
<<<<<<< HEAD
      <Button onClick={handleSearch} variant="outline-success">
=======
      <Button variant="outline-success" type="submit">
>>>>>>> 17f38007be98247e7bab5286ae63baee42956b5c
        Search
      </Button>
    </Form>
  );
}

export default Search;
