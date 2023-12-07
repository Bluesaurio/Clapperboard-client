import { useEffect, useState, useContext } from "react";
import service from "../services/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageApi from "./ImageApi";
import { AuthContext } from "../context/auth.context";

// Bootstrap
import Form from "react-bootstrap/Form";

function AddMovieList(props) {
  const redirect = useNavigate();
  const [queryValue, setQueryValue] = useState("");
  const [results, setResults] = useState([]);
  const [lookingForFilms, setLookingForFilms] = useState([]);
  const { loggedUser } = useContext(AuthContext);
  const params = useParams();

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

  const handleRemoveMovie = async (resultId) => {
    try {
      await service.patch(
        `/profile/lists/${props.listDetails._id}/${resultId}/delete`
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
              {loggedUser && params.userId === loggedUser._id && (
                <button onClick={() => handleRemoveMovie(eachMovie.apiId)}>
                  Remove movie from list
                </button>
              )}
            </div>
          );
        })}
      {loggedUser && params.userId === loggedUser._id && (
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
      )}

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
                {props.filmsId && props.filmsId.includes(eachResult.id) ? (
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
