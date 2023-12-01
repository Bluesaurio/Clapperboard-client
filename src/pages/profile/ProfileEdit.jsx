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

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleBio = (e) => setBio(e.target.value);
  const handlePronouns = (e) => setPronouns(e.target.value);
  const handleFileUpload = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!e.target.files[0]) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      redirect("/error");
    }
  };

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
      redirect(`/profile/${loggedUser._id}`);
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
          onChange={handleFirstName}
          defaultValue={userData.firstName}
        />
        <br />
        <label htmlFor="lastName">Last name: </label>
        <input
          type="text"
          name="lastName"
          onChange={handleLastName}
          defaultValue={userData.lastName}
        />
        <br />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          name="location"
          onChange={handleLocation}
          defaultValue={userData.location}
        />
        <br />
        <label htmlFor="bio">Bio: </label>
        <textarea
          name="bio"
          rows="5"
          cols="33"
          onChange={handleBio}
          defaultValue={userData.bio}
        />
        <br />
        <label htmlFor="pronouns">Pronouns: </label>
        <select
          name="pronouns"
          onChange={handlePronouns}
          defaultValue={userData.pronouns}
        >
          <option value={""}></option>
          <option value="he/him">he/him</option>
          <option value="she/her">she/her</option>
          <option value="they/them">they/them</option>
        </select>
        <br />
        <br />
        <img
          src={imageUrl ? imageUrl : userData.profilePic}
          alt={userData.username}
          width={200}
        />
        <div>
          <label>Image: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
        {isUploading ? <h3>... uploading image</h3> : null}
        {/* {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null} */}
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
