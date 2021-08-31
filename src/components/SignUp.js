import { useState } from "react";
import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/SignUp.css";

export default function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  function signUpUser(e) {
    e.preventDefault();

    console.log(signUpInfo);
  }

  return (
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
            type="text"
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
  );
}
