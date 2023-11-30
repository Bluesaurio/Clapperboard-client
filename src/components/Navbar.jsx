import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
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
        <button onClick={handleLogOut}>Log Out</button>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Create Account</Link>
        <Link to="/login">Log In</Link>
      </nav>
    );
  }
}

export default Navbar;
