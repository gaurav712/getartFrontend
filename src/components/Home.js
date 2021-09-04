import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/Home.css";

import icon from "../assets/image.png";

export default function Home() {
  const history = useHistory();

  /* Reference for login button */
  const loginButtonRef = useRef();

  /* For the Add Product button */
  const addProductButtonRef = useRef();

  /* useState for product list */
  const [products, setProducts] = useState([]);

  /* Login button state */
  const [loginStatus, setLoginStatus] = useState("Log In");

  /* Template for each product card */
  const ProductCard = ({ icon, productInfo }) => (
    <Link
      to={`/product/${productInfo._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="product">
        <img src={icon} className="productImage" alt="" />
        <div className="productDetails">
          <div className="name">
            {productInfo.title.length > 17
              ? productInfo.title.slice(0, 17) + "..."
              : productInfo.title}
          </div>
          <div className="price">₹{productInfo.price}</div>
        </div>
      </div>
    </Link>
  );

  useEffect(() => {
    /* Fetch 40 products by default */
    axios
      .get(`${process.env.BACKEND_URI}/products/40`)
      .then((res) => {
        console.log(res.data);

        setProducts(res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });

    /* Check if user is already logged in */
    var token = "";
    token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${process.env.BACKEND_URI}/users/user`, {
          headers: {
            "X-Auth-Token": token
          }
        })
        .then((res) => {
          setLoginStatus("Logout");
          loginButtonRef.current.style.display = "block";

          /* If the user is admin enable the addproduct button */
          console.log(res.data);
          if (res.data.email === "admin@getart") {
            addProductButtonRef.current.style.display = "block";
          }
        })
        .catch((err) => {
          console.log(err);
          loginButtonRef.current.style.display = "block";
        });
    } else {
      loginButtonRef.current.style.display = "block";
    }
  }, []);

  function handleUserLogin() {
    if (loginStatus === "Log In") {
      history.push("/login");
    } else if (loginStatus === "Logout") {
      console.log("logging out");
      localStorage.removeItem("token");
      history.push("/logout");
    }
  }

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <div className="headerBar">
        <div className="titleBar">
          <div className="titleText">Shopping</div>
          <div className="titleBarButtons">
            <button
              className="loginButton"
              onClick={() => history.push("/addproduct")}
              ref={addProductButtonRef}
              style={{ marginRight: "1em", display: "none" }}
            >
              Add Product
            </button>
            <button
              className="loginButton"
              onClick={handleUserLogin}
              ref={loginButtonRef}
              style={{ display: "none" }}
            >
              {loginStatus}
            </button>
          </div>
        </div>
        <input
          type="text"
          className="textInput"
          id="searchBox"
          placeholder="Search for products"
        />
      </div>
      <div className="wrapper">
        {products.map((product) => (
          <ProductCard icon={icon} productInfo={product} />
        ))}
      </div>
    </div>
  );
}
