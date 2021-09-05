import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/Home.css";

const BACKEND_URI = "https://getart-backend.herokuapp.com";

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
  const ProductCard = ({ productInfo }) => (
    <Link
      to={`/product/${productInfo._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="product">
        <img src={productInfo.coverImage} className="productImage" alt="" />
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
      .get(`${BACKEND_URI}/products/40`)
      .then((res) => {
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
        .get(`${BACKEND_URI}/users/user`, {
          headers: {
            "X-Auth-Token": token
          }
        })
        .then((res) => {
          setLoginStatus("Logout");
          loginButtonRef.current.style.display = "block";

          /* If the user is admin enable the addproduct button */
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

  function searchForProducts(query) {
    axios
      .get(`${BACKEND_URI}/products/search/${query}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Helmet>
        <title>Shopping</title>
        <meta name="description" content="Shop for your daily products" />
      </Helmet>
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div className="headerBar">
          <div className="titleBar">
            <div className="titleText">Shopping</div>
            <div className="titleBarButtons">
              <button
                className="loginButton"
                onClick={() => history.push("/addproduct")}
                ref={addProductButtonRef}
                style={{ marginRight: ".5em", display: "none" }}
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchForProducts(e.target.value);
              }
            }}
          />
        </div>
        <div className="wrapper">
          {products.map((product) => (
            <ProductCard productInfo={product} />
          ))}
        </div>
      </div>
    </>
  );
}
