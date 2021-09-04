import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

import "../assets/stylesheets/ProductDetails.css";
import image from "../assets/image.png";

export default function ProductDetails() {
  /* Set productId */
  var productId = useLocation().pathname.replace(/\/*.*\//, "");
  var history = useHistory();

  /* useState for authorization status */
  const [authorized, setAuthorized] = useState(false);

  /* useState for product details */
  const [productDetails, setProductDetails] = useState({
    title: "",
    price: 0,
    description: "",
    seoTitle: "",
    seoDescription: ""
  });

  /* TO get cartPanel instance */
  const cartPanelRef = useRef();

  /*
   * It retries after a fixed interval
   * as the productId isn't being set quickly enough
   */
  function fetchData() {
    setTimeout(() => {
      if (!(productId === "undefined")) {
        /* Fetch product details */
        axios
          .get(`${process.env.BACKEND_URI}/products/details/${productId}`)
          .then((res) => {
            console.log(res.data);
            setProductDetails(res.data);
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data);
            }
          });
      } else {
        fetchData();
      }
    }, 50);
  }

  function setAuthorizationStatus() {
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
          setAuthorized(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    /* If it hasn't loaded the data yet */
    if (productDetails.title === "") {
      setAuthorizationStatus();
      fetchData();
    }
  });

  function toggleCartPanel() {
    if (authorized) {
      const cartPanel = cartPanelRef.current;
      cartPanel.style.display =
        getComputedStyle(cartPanel).getPropertyValue("display") === "none"
          ? "block"
          : "none";
    } else {
      history.push("/login");
      alert("You need to login first!");
    }
  }

  function addProductToCart() {
    if (authorized) {
      console.log("added to cart");
    } else {
      history.push("/login");
      alert("You need to login first!");
    }
  }

  return (
    <div className="productArea">
      <div className="topBar">
        <button id="homeLink" onClick={() => history.push("/")}></button>
        <label htmlFor="homeLink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 0 24 24"
            width="40px"
            fill="#eee"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
          </svg>
        </label>
        <button id="toggleCartPanel" onClick={toggleCartPanel}></button>
        <label htmlFor="toggleCartPanel">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 0 24 24"
            width="40px"
            fill="#eee"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </label>
      </div>
      <div className="cartPanel" ref={cartPanelRef}>
        Some Text
      </div>
      <div className="productDetailsSection">
        <div className="imageSection">
          <img src={image} className="productImage" alt="" />
        </div>
        <div className="descriptionSection">
          <div className="infoSection">
            <div className="productTitle">{productDetails.title}</div>
            <div className="productPrice">₹ {productDetails.price}</div>
            <div
              className="productDescription"
              dangerouslySetInnerHTML={{ __html: productDetails.description }}
            ></div>
          </div>
          <div className="productVariantsSection"></div>
          <div className="checkoutControlsSection">
            <button
              className="loginButton"
              id="addToCartButton"
              onClick={addProductToCart}
            >
              ADD TO CART
            </button>
            <button
              className="loginButton"
              id="buyNowButton"
              onClick={addProductToCart}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
