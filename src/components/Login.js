import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/Login.css";

const BACKEND_URI = "https://getart-backend.herokuapp.com";

export default function Login() {
  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  function checkAuthorizationStatus() {
    /* Check if user is already logged in */
    var token = "";
    token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${BACKEND_URI}/users/user`, {
          headers: {
            "X-Auth-Token": token
          }
        })
        .then((res) => {
          alert("You are already logged in!");
          history.push("/authenticated");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    checkAuthorizationStatus();
  });

  function logInToAccount(e) {
    e.preventDefault();

    console.log(loginInfo);
    axios
      .post(`${BACKEND_URI}/users/login`, loginInfo)
      .then((res) => {
        console.log(res);
        try {
          localStorage.setItem("token", res.data.token);
        } catch (err) {
          console.log({
            msg: "Failed to save authentication data to local storage",
            err
          });
        }
        history.push("/authenticated");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to your account" />
      </Helmet>
      <form className="container loginContent" onSubmit={logInToAccount}>
        <div className="heading">Log In</div>
        <input
          type="email"
          className="loginFields textInput"
          placeholder="E-mail"
          value={loginInfo.email}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
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
    </>
  );
}
