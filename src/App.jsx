import "./App.css";
import { Routes, Route } from "react-router";

// pages
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";
import About from "./pages/About";
import Profile from "./pages/profile/Profile";
import ProfileEdit from "./pages/profile/ProfileEdit";
import MovieDetails from "./pages/movies/MovieDetails";
import MovieResults from "./pages/movies/MovieResults";
import Reviews from "./pages/reviews/Reviews";
import CustomList from "./pages/list/CustomLists";
import ListDetails from "./pages/list/ListDetails";

// components
import IsAlreadyLoggedIn from "./components/IsAlreadyLoggedIn";
import IsPrivate from "./components/IsPrivate";
import AppNavbar from "./components/AppNavbar";

function App() {
  return (
    <>
      <AppNavbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={
            <IsAlreadyLoggedIn>
              <Register />
            </IsAlreadyLoggedIn>
          }
        />

        <Route
          path="/login"
          element={
            <IsAlreadyLoggedIn>
              <Login />
            </IsAlreadyLoggedIn>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/profile/:userId" element={<Profile />} />

        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              <ProfileEdit />
            </IsPrivate>
          }
        />

        <Route path="/movie/:movieId/details" element={<MovieDetails />} />
        <Route path="/movie/:search/results" element={<MovieResults />} />
        <Route path="/profile/:userId/reviews" element={<Reviews />} />
        <Route path="/profile/:userId/lists" element={<CustomList />} />
        <Route
          path="/profile/:userId/lists/:listId/details"
          element={<ListDetails />}
        />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
