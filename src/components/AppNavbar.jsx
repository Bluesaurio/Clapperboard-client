import { useContext, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Search from "./Search";
import logoImage from "../../public/ClapperboardBold.png";

// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

function AppNavbar() {
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
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img src={logoImage} style={{ width: "250px", height: "70px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="Profile" id="collapsible-nav-dropdown">
                <NavDropdown.Item href={`/profile/${loggedUser._id}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={`/profile/${loggedUser._id}/reviews`}>
                  Reviews
                </NavDropdown.Item>
                <NavDropdown.Item href={`/profile/${loggedUser._id}/lists`}>
                  Lists
                </NavDropdown.Item>
                <NavDropdown.Item href="/">Favorites</NavDropdown.Item>
                <NavDropdown.Item href="/">Watchlist</NavDropdown.Item>
                <NavDropdown.Divider />
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{ marginLeft: "15px" }}
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </NavDropdown>
            </Nav>
            <Nav>
              <Search movies={movies} setMovies={setMovies} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Clapperboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/register">Create Account</Nav.Link>
            </Nav>
            <Search movies={movies} setMovies={setMovies} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AppNavbar;
