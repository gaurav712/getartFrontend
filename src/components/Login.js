import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/Login.css";

export default function Login() {
  function logInToAccount(e) {
    e.preventDefault();
  }

  return (
    <form className="container loginContent" onSubmit={logInToAccount}>
      <div className="heading">Log In</div>
      <input type="text" className="loginFields" placeholder="Username" />
      <input type="password" className="loginFields" placeholder="Password" />
      <input type="submit" className="loginButton loginFields" value="Log In" />
    </form>
  );
}
