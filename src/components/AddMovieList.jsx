import { useEffect, useState, useContext } from "react";
import service from "../services/config";
import { useNavigate, useParams } from "react-router-dom";
import ImageApi from "./ImageApi";
import { AuthContext } from "../context/auth.context";

// Bootstrap
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

function AddMovieList(props) {
  const redirect = useNavigate();
  const [queryValue, setQueryValue] = useState("");
  const [results, setResults] = useState([]);
  const [lookingForFilms, setLookingForFilms] = useState([]);
  const { loggedUser } = useContext(AuthContext);
  const params = useParams();

  // TimeOut para buscar a medida que escribes. El timeout vuelve a empezar cada vez que el campo de busqueda (lookingForFilms) se vuelve a rellenar

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      getApiResults();
    }, 1500);
    return () => clearTimeout(delayedSearch);
  }, [lookingForFilms]);

  const getApiResults = async () => {
    try {
      const response = await service.get(`/movie/${queryValue}/results`);
      setResults(response.data.results);
    } catch (error) {}
  };

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
      redirect("/error");
    }
  };

  return (
    <div>
      <div className="list-container-wrapper">
        {props.listDetails.filmDetails &&
          props.listDetails.filmDetails.map((eachMovie) => {
            return (
              <div key={eachMovie.apiId} className="list-container">
                <div className="list-details">
                  <ImageApi
                    path={eachMovie.image}
                    alt={eachMovie.title}
                    className="list-image-search"
                  />
                </div>
                <div className="button-container">
                  {loggedUser && params.userId === loggedUser._id && (
                    <Button
                      variant="danger"
                      type="submit"
                      style={{ border: "1px solid white", margin: "10px" }}
                      onClick={() => handleRemoveMovie(eachMovie.apiId)}
                    >
                      Remove movie
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <div>
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
      </div>
      <div className="movie-results-container">
        {lookingForFilms !== "" &&
          results.map((eachResult, index) => {
            return (
              <div key={index} className="movie-results-item">
                <h5> {eachResult.title}</h5>
                <div className="movie-results-details">
                  <ImageApi
                    path={eachResult.poster_path}
                    alt={eachResult.title}
                    className="movie-results-image"
                  />
                  {props.filmsId && props.filmsId.includes(eachResult.id) ? (
                    <p key={eachResult.id} className="movie-results-message">
                      Movie added!
                    </p>
                  ) : (
                    <div
                      key={eachResult.id}
                      className="movie-results-button-container"
                    >
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => handleAddMovie(eachResult.id)}
                      >
                        Add to the list
                      </Button>
                      {/* <button onClick={() => handleAddMovie(eachResult.id)}>
                        Add to the list
                      </button> */}
                    </div>
                  )}
                </div>
                <br />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AddMovieList;
