import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [queryValue, setQueryValue] = useState("");

  const redirect = useNavigate();

  const handleQueryChange = (event) => {
    console.log(event.target.value);
    setQueryValue(event.target.value);
  };

  const handleSearch = () => {
    redirect(`/movie/${queryValue}/results`);
  };

  return (
    <div>
      <label htmlFor="query">Buscar: </label>
      <input
        type="text"
        name="query"
        onChange={handleQueryChange}
        value={queryValue}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
