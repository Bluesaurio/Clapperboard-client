import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import service from "../../services/config";

function Profile() {
  const { isLoggedIn, authenticateUser, loggedUser } = useContext(AuthContext);
  console.log(loggedUser);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/profile/${loggedUser._id}`);
      console.log(response.data);
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h3>Buscando data</h3>;
  }
  // llamar al backend para conseguir más datos del user, y poder rellenar su perfil con nombre, img, etc

  return (
    <div>
      <nav>
        <Link to={`/profile/${loggedUser._id}/reviews`}>Reviews</Link>
        <span> | </span>
        <Link to={`/profile/${loggedUser._id}/favorites`}>Favorites</Link>
        <span> | </span>
        <Link to={`/profile/${loggedUser._id}/watchlist`}>Watchlist</Link>
        <span> | </span>
        <Link to={`/profile/${loggedUser._id}/lists`}>Lists</Link>
      </nav>

      <div>
        <h3>{userData.username}</h3>
        <img src={userData.profilePic} alt={userData.username} width={100} />
        {userData.firstName && <p>{userData.firstName}</p>}
        {userData.lastName && <p>{userData.lastName}</p>}
        {userData.pronouns && <p>{userData.pronouns}</p>}
        {userData.bio && <p>{userData.bio}</p>}
        {userData.location && <p>{userData.location}</p>}
        <br />
        <button>Editar perfil</button>
      </div>
    </div>
  );
}

export default Profile;
