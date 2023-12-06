import { useEffect, useState } from "react";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import service from "../services/config";
import Dropdown from "react-bootstrap/Dropdown";

function AddMovieList() {
  const [queryValue, setQueryValue] = useState("");
  const [results, setResults] = useState([]);

  const handleQueryChange = async (e) => {
    setQueryValue(e.target.value);
    try {
      setTimeout(async () => {
        const response = await service.get(`/movie/${queryValue}/results`);
        console.log("Esto es lo que recibo", response.data.results);
        setResults(response.data.results);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={handleQueryChange}
          defaultValue={queryValue}
        />
      </Form>
      {results.map((eachResult) => {
        return (
          <div>
            {eachResult.title}
            <img
              src={`https://www.themoviedb.org/t/p/w200/${eachResult.poster_path}`}
            ></img>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default AddMovieList;
