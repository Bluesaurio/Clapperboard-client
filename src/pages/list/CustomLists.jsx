import { Link, useNavigate, useParams } from "react-router-dom";
import AddList from "../../components/AddList";
import { useEffect, useState } from "react";
import service from "../../services/config";
import { BeatLoader } from "react-spinners";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function CustomList() {
  const params = useParams();
  const redirect = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  const [allUserLists, setAllUserLists] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/profile/${params.userId}/lists`);
      console.log(response.data);
      setAllUserLists(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
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
      {allUserLists.map((eachList) => {
        return (
          <div key={eachList._id}>
            <p>Name: {eachList.name}</p>
            <p>Description: {eachList.description}</p>
            <Link
              to={`/profile/${params.userId}/lists/${eachList._id}/details`}
            >
              <p>Imaginemos que esto es la imagen de la lista</p>
            </Link>
          </div>
        );
      })}
      {loggedUser._id === params.userId && <AddList getData={getData} />}
    </div>
  );
}

export default CustomList;
