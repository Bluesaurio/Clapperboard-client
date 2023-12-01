import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";
import { Link, useNavigate } from "react-router-dom";

function ProfileEdit() {
  const { loggedUser } = useContext(AuthContext);

  const redirect = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("");

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleBio = (e) => setBio(e.target.value);
  const handlePronouns = (e) => setPronouns(e.target.value);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateProfile = { firstName, lastName, location, bio, pronouns };

    try {
      const response = await service.put("/profile", updateProfile);
      console.log(response);
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
  };
  if (isLoading) {
    return <h3>Buscando data</h3>;
  }

  return (
    <div>
      <h3>Update your profile: </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name: </label>
        <input
          type="text"
          name="firstName"
          defaultValue={userData.firstName}
          onChange={handleFirstName}
          value={firstName}
        />
        <br />
        <label htmlFor="lastName">Last name: </label>
        <input
          type="text"
          name="lastName"
          defaultValue={userData.lastName}
          onChange={handleLastName}
          value={lastName}
        />
        <br />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          name="location"
          defaultValue={userData.location}
          onChange={handleLocation}
          value={location}
        />
        <br />
        <label htmlFor="bio">Bio: </label>
        <textarea
          name="bio"
          rows="5"
          cols="33"
          defaultValue={userData.bio}
          onChange={handleBio}
          value={bio}
        />
        <br />
        <label htmlFor="pronouns">Pronouns: </label>
        <select name="pronouns" onChange={handlePronouns} value={pronouns}>
          <option value="he/him">he/him</option>
          <option value="she/her">she/her</option>
          <option value="they/them">they/them</option>
        </select>
        <br />
        <img src={userData.profilePic} alt={userData.username} width={100} />
        <br />
        <button>Change your avatar</button>
        <br />
        <br />
        <button>Confirm changes</button>
        <Link to={`/profile/${userData._id}`}>
          <button>Back</button>
        </Link>
      </form>
    </div>
  );
}

export default ProfileEdit;
