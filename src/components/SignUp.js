import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/SignUp.css";

const BACKEND_URI = "https://getart-backend.herokuapp.com";

export default function SignUp() {
  const history = useHistory();

  const [signUpInfo, setSignUpInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  function signUpUser(e) {
    e.preventDefault();
    console.log(signUpInfo);
    axios
      .post(`${BACKEND_URI}/users/add`, signUpInfo)
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
        <title>Sign Up</title>
        <meta name="description" content="Create a new account" />
      </Helmet>
      <form className="container signUpContent" onSubmit={signUpUser}>
        <center>
          <div className="heading">Enter your details</div>
        </center>
        <div>
          <div className="nameSection">
            <input
              type="text"
              className="textInput nameSectionElement"
              placeholder="First Name"
              value={signUpInfo.firstName}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, firstName: e.target.value })
              }
            />
            <input
              type="text"
              className="textInput nameSectionElement"
              placeholder="Last Name"
              value={signUpInfo.lastName}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, lastName: e.target.value })
              }
            />
          </div>
          <div className="emailSection">
            <input
              type="email"
              className="textInput emailSectionElement"
              placeholder="Enter your email"
              value={signUpInfo.email}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, email: e.target.value })
              }
            />
            <input
              type="password"
              className="textInput emailSectionElement"
              placeholder="Password"
              value={signUpInfo.password}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, password: e.target.value })
              }
            />
            <input
              type="submit"
              className="loginButton signUpButton"
              value="Sign Up"
            />
          </div>
        </div>
      </form>
    </>
  );
}
