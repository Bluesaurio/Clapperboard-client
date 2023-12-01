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

// components
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
