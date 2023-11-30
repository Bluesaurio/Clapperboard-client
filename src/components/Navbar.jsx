import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/register">Create user</Link>
      <span> | </span>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Navbar;
