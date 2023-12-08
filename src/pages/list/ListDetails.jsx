import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import { Link } from "react-router-dom";
import AddMovieList from "../../components/AddMovieList";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../../context/auth.context";
import { Button } from "react-bootstrap";

function ListDetails() {
  const [listDetails, setListDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [idToEdit, setIdToEdit] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [filmsId, setFilmsId] = useState([]);

  const params = useParams();
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(
        `/profile/${params.userId}/lists/${params.listId}`
      );
      const allFilmIds =
        response.data.filmDetails &&
        response.data.filmDetails.map((eachFilm) => {
          return eachFilm.apiId;
        });
      setFilmsId(allFilmIds);
      setListDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedList = {
      name,
      description,
    };

    try {
      await service.put(
        `/profile/${params.userId}/lists/${params.listId}`,
        updatedList
      );

      getData();
      setName(null);
      setDescription(null);
      setIdToEdit(null);
    } catch (error) {
      redirect("/error");
    }
  };
  const handleDelete = async () => {
    try {
      await service.delete(`/profile/${params.userId}/lists/${params.listId}`);
      redirect(`/profile/${params.userId}/lists/`);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleChangeIsEditable = (listId) => {
    setName(null);
    setDescription(null);
    setIdToEdit(listId);
  };

  if (isLoading) {
    return (
      <div
        style={{
          paddingTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BeatLoader color="orange" size={25} />
      </div>
    );
  }

  return (
    <div>
      {idToEdit === listDetails._id ? (
        <div className="form-container">
          <form onSubmit={(e) => handleSubmit(e, listDetails._id)}>
            <div className="form-input-container">
              <input
                type="text"
                defaultValue={listDetails.name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-input-container">
              <textarea
                name={listDetails.description}
                cols="30"
                rows="10"
                defaultValue={listDetails.description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="form-button-container">
              <Button
                disabled={!name || !description}
                type="submit"
                variant="success"
                style={{
                  padding: "5px 20px",
                  marginBottom: "5px",
                  marginLeft: "10px",
                }}
              >
                Save
              </Button>

              <br />
              <Button
                variant="light"
                type="submit"
                onClick={() => handleChangeIsEditable(null)}
                style={{
                  padding: "5px 20px",
                  marginBottom: "5px",
                  marginLeft: "10px",
                }}
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h3>{listDetails.name}</h3>
          <p>{listDetails.description}</p>

          {loggedUser && params.userId === loggedUser._id && (
            <Button
              variant="light"
              type="submit"
              style={{
                backgroundColor: "#fdb14d",
                padding: "5px 20px",
                marginBottom: "5px",
              }}
              onClick={() => handleChangeIsEditable(listDetails._id)}
            >
              Edit
            </Button>
          )}
          <br />
          {loggedUser && params.userId === loggedUser._id && (
            <Button
              variant="danger"
              type="submit"
              style={{
                padding: "5px 20px",
                marginBottom: "5px",
                marginRight: "10px",
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
          <Link to={`/profile/${params.userId}/lists/`}>
            <Button
              variant="light"
              type="submit"
              style={{
                padding: "5px 20px",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              Back
            </Button>
          </Link>
        </div>
      )}
      <AddMovieList
        getData={getData}
        listDetails={listDetails}
        filmsId={filmsId}
      />
    </div>
  );
}

export default ListDetails;
