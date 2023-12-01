import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";
import { Link } from "react-router-dom";

function ProfileEdit() {
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
    <form>
      <label htmlFor="firstName">First name: </label>
      <input type="text" name="firstName" defaultValue={userData.firstName} />
      <br />
      <label htmlFor="lastName">Last name: </label>
      <input type="text" name="lastName" defaultValue={userData.lastName} />
      <br />
      <label htmlFor="location">Location: </label>
      <input type="text" name="location" defaultValue={userData.location} />
      <br />
      <label htmlFor="bio">Bio: </label>
      <textarea name="bio" rows="5" cols="33" defaultValue={userData.bio} />
      <br />
      <label htmlFor="pronouns">Pronouns: </label>
      <select name="pronouns">
        <option value="he/him">he/him</option>
        <option value="she/her">she/her</option>
        <option value="they/them">they/them</option>
      </select>
      <br />
      <img src={userData.profilePic} alt={userData.username} width={100} />
      <br />
      <button>Cambiar imagen de perfil</button>
      <br />
      <br />
      <button>Confirmar cambios</button>
      <Link to={`/profile/${userData._id}`}>
        <button>Atrás</button>
      </Link>
    </form>
  );
}

export default ProfileEdit;
