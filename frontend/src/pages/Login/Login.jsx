import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ROUTES } from "../../routes/consts";
import styles from "./Login.module.scss";
import eventManagement from "../../assets/eventManagement.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login Attempt:", email, password);
    navigate(ROUTES.EVENTS);
  };

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginImageContainer}>
          <img
            src={eventManagement}
            alt="Login"
            className={styles.loginImage}
          />
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h2 className={styles.loginTitle}>Login</h2>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.buttonContainer}>
            <Button color="secondary" type="submit">
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
