import { useEffect, useState } from "react";
import service from "../services/config";
import { Link, useNavigate } from "react-router-dom";
import ImageApi from "./ImageApi";

// Bootstrap
import Form from "react-bootstrap/Form";

function AddMovieList(props) {
  const redirect = useNavigate();
  const [queryValue, setQueryValue] = useState("");
  const [results, setResults] = useState([]);
  const [lookingForFilms, setLookingForFilms] = useState([]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      getApiResults();
    }, 1500);
    return () => clearTimeout(delayedSearch);
  }, [lookingForFilms]);

  const getApiResults = async () => {
    try {
      const response = await service.get(`/movie/${queryValue}/results`);
      console.log(response.data);
      setResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(results);

  const handleQueryChange = async (e) => {
    setQueryValue(e.target.value);
    setLookingForFilms(e.target.value);
  };

  const handleAddMovie = async (resultId) => {
    try {
      await service.patch(
        `/profile/lists/${props.listDetails._id}/${resultId}`
      );
      props.getData();
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
  };

  console.log(
    "DETALLES DE LA LISTA",
    props.listDetails,
    "DETALLES DE LA BUSQUEDA",
    results
  );

  return (
    <div>
      {props.listDetails.filmDetails &&
        props.listDetails.filmDetails.map((eachMovie) => {
          return (
            <div key={eachMovie.apiId} className="list-container">
              <ImageApi
                path={eachMovie.image}
                alt={eachMovie.title}
                className="list-image"
              />
            </div>
          );
        })}
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
              <div>
                <ImageApi
                  path={eachResult.poster_path}
                  alt={eachResult.title}
                  className="review-image"
                />
                {props.filmsId.includes(eachResult.id) ? (
                  <p key={eachResult.id}>Movie added!</p>
                ) : (
                  <div key={eachResult.id}>
                    <button onClick={() => handleAddMovie(eachResult.id)}>
                      Add to the list
                    </button>
                  </div>
                )}
              </div>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default AddMovieList;
