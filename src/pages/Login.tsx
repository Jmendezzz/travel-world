import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuthContext } from "../contexts/AuthContext";

 function Login() {
  const [email, setEmail] = useState("jhon@gmail.com");
  const [password, setPassword] = useState("qwerty");
  const {login,isAuthenticated}  = useAuthContext();

  const navigate = useNavigate();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/app", {replace:true}) // With this we replace the origin of the history, so the login page is not in the history.
    }
  },[isAuthenticated])

  return (
    <main className={styles.login}>
      <PageNav /> 
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
export default Login;
