import { useContext, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Search from "../components/Search";

function Navbar() {
  const { isLoggedIn, authenticateUser, loggedUser } = useContext(AuthContext);

  const [movies, setMovies] = useState("");

  const redirect = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");

    authenticateUser();

    redirect("/");
  };

  if (isLoggedIn) {
    return (
      <nav>
        <Search movies={movies} setMovies={setMovies} />

        <NavLink to="/">Home</NavLink>
        <span> | </span>
        <NavLink to="/about">About</NavLink>
        <span> | </span>
        <NavLink to={`/profile/${loggedUser._id}`}>Profile</NavLink>
        <span> | </span>
        <button onClick={handleLogOut}>Log Out</button>
      </nav>
    );
  } else {
    return (
      <nav>
        <Search movies={movies} setMovies={setMovies} />

        <NavLink to="/">Home</NavLink>
        <span> | </span>
        <NavLink to="/about">About</NavLink>
        <span> | </span>
        <NavLink to="/login">Log In</NavLink>
        <span> | </span>
        <NavLink to="/register">Create Account</NavLink>
      </nav>
    );
  }
}

export default Navbar;
