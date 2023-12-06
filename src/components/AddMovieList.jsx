import { useEffect, useState } from "react";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import service from "../services/config";
import Dropdown from "react-bootstrap/Dropdown";

function AddMovieList() {
  const [queryValue, setQueryValue] = useState("");
  const [results, setResults] = useState([]);
  const [lookingForFilms, setLookingForFilms] = useState([]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      getData();
    }, 1500);
    return () => clearTimeout(delayedSearch);
  }, [lookingForFilms]);

  const getData = async () => {
    try {
      const response = await service.get(`/movie/${queryValue}/results`);
      setResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQueryChange = async (e) => {
    setQueryValue(e.target.value);
    setLookingForFilms(e.target.value);
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
      {lookingForFilms !== "" &&
        results.map((eachResult, index) => {
          return (
            <div key={index}>
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
