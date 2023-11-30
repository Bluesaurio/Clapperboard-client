import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar(props) {
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const redirect = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");

    authenticateUser();

    redirect("/");
  };

  if (isLoggedIn) {
    return (
      <nav>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/about">About</Link>
        <span> | </span>
        <Link to="/profile">Profile</Link>
        <span> | </span>
        <button onClick={handleLogOut}>Log Out</button>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/about">About</Link>
        <span> | </span>
        <Link to="/login">Log In</Link>
        <span> | </span>
        <Link to="/register">Create Account</Link>
      </nav>
    );
  }
}

export default Navbar;
