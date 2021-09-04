import { useHistory } from "react-router-dom";
import "../assets/stylesheets/Authenticated.css";

export default function Authenticated() {
  const history = useHistory();
  function redirectToHomepage() {
    setTimeout(() => history.push("/"), 2000);
  }

  return (
    <div className="authenticatedPopup">
      You are authenticated!
      <br />
      Redirecting you to the homepage...
      {redirectToHomepage()}
    </div>
  );
}
