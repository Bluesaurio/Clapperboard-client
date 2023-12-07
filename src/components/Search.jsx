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
      redirect(`/movie/${queryValue}/results`);
      window.location.reload(); // apaño para "refrescar" la pagina tras la busqueda
      setQueryValue("");
    }
  };

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={handleQueryChange}
        value={queryValue}
      />
      <Button onClick={handleSearch} variant="outline-success">
        Search
      </Button>
    </Form>
  );
}

export default Search;
