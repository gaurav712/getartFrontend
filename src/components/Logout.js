import { useHistory } from "react-router-dom";
import "../assets/stylesheets/Authenticated.css";

export default function Logout() {
  const history = useHistory();
  function redirectToHomepage() {
    setTimeout(() => history.push("/"), 2000);
  }

  return (
    <div className="authenticatedPopup">
      You are logged out!
      <br />
      Redirecting you to the homepage...
      {redirectToHomepage()}
    </div>
  );
}
