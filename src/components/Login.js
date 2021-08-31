import { useState } from "react";
import { Link } from "react-router-dom";
import SHA256 from "../utils/sha256";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/Login.css";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
  });

  function logInToAccount(e) {
    e.preventDefault();

    setLoginInfo({ ...loginInfo, password: SHA256(loginInfo.password) });
    console.log(loginInfo);
  }

  return (
    <form className="container loginContent" onSubmit={logInToAccount}>
      <div className="heading">Log In</div>
      <input
        type="text"
        className="loginFields textInput"
        placeholder="Username"
        value={loginInfo.username}
        onChange={(e) =>
          setLoginInfo({ ...loginInfo, username: e.target.value })
        }
      />
      <input
        type="password"
        className="loginFields textInput"
        placeholder="Password"
        value={loginInfo.password}
        onChange={(e) =>
          setLoginInfo({ ...loginInfo, password: e.target.value })
        }
      />
      <input
        type="submit"
        className="loginButton loginFields textInput"
        value="Log In"
      />
      <div className="signUpText">
        No account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </form>
  );
}
