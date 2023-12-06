import { useState } from "react";
import service from "../services/config";
import { useNavigate, useParams } from "react-router-dom";

function AddList(props) {
  const params = useParams();
  console.log(params.userId);
  const redirect = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Custom");

  const handleListName = (e) => {
    setName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customList = { name, description, category };
    console.log(customList);

    try {
      const response = await service.post(
        `/profile/${params.userId}/lists`,
        customList
      );
      props.getData();
      console.log(response);
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
  };

  return (
    <div>
      <h4>Create your lists</h4>
      <form onSubmit={handleSubmit}>
        <label>Give a name to your list: </label>
        <br />

        <input type="text" value={name} onChange={handleListName} />
        <br />
        <br />

        <label>What's your list about?: </label>
        <br />

        <textarea value={description} onChange={handleDescription}></textarea>
        <br />
        <br />

        <label>What type of list is it?: </label>
        <br />

        <select value={category} onChange={handleCategory}>
          <option value="Custom">Custom</option>
          <option value="Favorites">Favorites</option>
          <option value="Watchlist">Watchlist</option>
        </select>
        <br />
        <br />

        <button type="submit">Create it</button>
      </form>
    </div>
  );
}

export default AddList;
