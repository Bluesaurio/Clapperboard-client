import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, NavLink } from "react-router-dom";
import service from "../../services/config";

// Bootstrap
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Profile() {
  const { loggedUser } = useContext(AuthContext);

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

  return (
    <div className="profile-container">
      <div className="profile-nav">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href={`/profile/${loggedUser._id}/reviews`}>
            Reviews
          </Nav.Link>
          <Nav.Link href={`/profile/${loggedUser._id}/favorites`}>
            Favorites
          </Nav.Link>
          <Nav.Link href={`/profile/${loggedUser._id}/watchlist`}>
            Watchlist
          </Nav.Link>
          <Nav.Link href={`/profile/${loggedUser._id}/lists`}>Lists</Nav.Link>
        </Nav>
      </div>

      <div className="profile-content">
        <h4>{userData.username}</h4>
        <img src={userData.profilePic} alt={userData.username} width={200} />
        {userData.firstName && userData.lastName && (
          <p>
            {userData.firstName} {userData.lastName}
          </p>
        )}
        {userData.pronouns && (
          <p>
            <strong>Pronouns:</strong> {userData.pronouns}
          </p>
        )}
        {userData.bio && <p>{userData.bio}</p>}
        {userData.location && (
          <p>
            <strong>Location:</strong> {userData.location}
          </p>
        )}
        <br />
        <Link to={"/profile/edit"}>
          <Button
            variant="light"
            type="submit"
            style={{ backgroundColor: "#fdb14d" }}
          >
            Edit profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
