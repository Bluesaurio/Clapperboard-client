import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const redirect = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = { username, password };
      const response = await service.post("/auth/login", credentials);
      console.log(response);

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      redirect("/"); //! TEMPORAL (o no...)
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data.errorMessage);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        redirect("/error");
      }
    }
  };

  return (
    <div>
      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Username :</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>

        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
    </div>
  );
}

export default Login;
