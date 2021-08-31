import { Link } from "react-router-dom";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/Home.css";

export default function Home() {
  return (
    <div className="container">
      <Link to={"/login"} className="loginButton">
        Log In
      </Link>
    </div>
  );
}
