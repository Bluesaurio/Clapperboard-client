import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import AddMovieList from "../../components/AddMovieList";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../../context/auth.context";

function ListDetails() {
  const params = useParams();
  const redirect = useNavigate();

  const [listDetails, setListDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [idToEdit, setIdToEdit] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [filmsId, setFilmsId] = useState([]);
  const { loggedUser } = useContext(AuthContext);

  console.log("filmsId AQUI", filmsId);

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
      console.log(response.data);
      setListDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
      console.log(error);
      redirect("/error");
    }
  };
  const handleDelete = async () => {
    try {
      await service.delete(`/profile/${params.userId}/lists/${params.listId}`);
      redirect(`/profile/${params.userId}/lists/`);
    } catch (error) {
      console.log(error);
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
        <div>
          <form onSubmit={(e) => handleSubmit(e, listDetails._id)}>
            <input
              type="text"
              defaultValue={listDetails.name}
              onChange={handleNameChange}
            />
            <textarea
              name={listDetails.description}
              cols="30"
              rows="10"
              defaultValue={listDetails.description}
              onChange={handleDescriptionChange}
            />
            <button disabled={!name || !description} type="submit">
              Save
            </button>
            <br />
            <button onClick={() => handleChangeIsEditable(null)}>Back</button>
          </form>
        </div>
      ) : (
        <div>
          <h3>{listDetails.name}</h3>
          <p>{listDetails.description}</p>

          {params.userId === loggedUser._id && (
            <button onClick={() => handleChangeIsEditable(listDetails._id)}>
              Edit
            </button>
          )}
          <br />
          {params.userId === loggedUser._id && (
            <button onClick={handleDelete}>Delete</button>
          )}
          <Link to={`/profile/${params.userId}/lists/`}>
            <button>Back</button>
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
