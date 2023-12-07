import { Link, useNavigate, useParams } from "react-router-dom";
import AddList from "../../components/AddList";
import { useEffect, useState } from "react";
import service from "../../services/config";
import { BeatLoader } from "react-spinners";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import ImageApi from "../../components/ImageApi";

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
  console.log("QUE TENGO AQUI", allUserLists);
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
              <div>
                {eachList.filmDetails && eachList.filmDetails[0] && (
                  <ImageApi
                    path={eachList.filmDetails[0].image}
                    alt={eachList.filmDetails[0].title}
                    className="review-image"
                  />
                )}
                {eachList.filmDetails && eachList.filmDetails[1] && (
                  <ImageApi
                    path={eachList.filmDetails[1].image}
                    alt={eachList.filmDetails[1].title}
                    className="review-image"
                  />
                )}
                {eachList.filmDetails && eachList.filmDetails[2] && (
                  <ImageApi
                    path={eachList.filmDetails[2].image}
                    alt={eachList.filmDetails[2].title}
                    className="review-image"
                  />
                )}
                {eachList.filmDetails && eachList.filmDetails[3] && (
                  <ImageApi
                    path={eachList.filmDetails[3].image}
                    alt={eachList.filmDetails[3].title}
                    className="review-image"
                  />
                )}
                {loggedUser?._id === params.userId && !eachList.filmDetails && (
                  <p>Click here to add a movie!</p>
                )}
                {eachList.filmDetails?.length === 0 && (
                  <p>This list has no movies yet</p>
                )}
              </div>
            </Link>
          </div>
        );
      })}
      {loggedUser && loggedUser._id === params.userId && (
        <AddList getData={getData} />
      )}
    </div>
  );
}

export default CustomList;
