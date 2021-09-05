import { useEffect, useState } from "react";
import axios from "axios";
import NumericInput from "react-numeric-input";

import "../assets/stylesheets/Cart.css";

export default function () {
  const [productsInCart, setProductsInCart] = useState([]);

  /* Template for entries */
  const CartEntry = ({ icon, title, price }) => (
    <div className="cartEntry">
      <img src={icon} className="cartPanelProductImage" alt="" />
      <div className="cartPanelProductDetails">
        <div>
          <div className="cartPanelProductTitle">{title}</div>
          <div className="cartPanelProductprice">₹{price}</div>
        </div>
        <NumericInput
          min={1}
          max={10}
          value={1}
          style={{
            input: {
              width: "100%",
              maxWidth: "10em",
              background: "#ddd",
              height: "1.5rem",
              border: "none",
              outline: "none",
              padding: ".1em 1em"
            }
          }}
        />
      </div>
    </div>
  );

  function closeCartPanel() {
    const cartPanel = document.getElementById("cartPanelDiv");
    cartPanel.style.display = "none";
  }

  useEffect(() => {
    /* Get items in the cart */
    var token = "";
    token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${process.env.BACKEND_URI}/cart`, {
          headers: {
            "X-Auth-Token": token
          }
        })
        .then((res) => {
          if (res.data) {
            console.log("hell");
            setProductsInCart(res.data.products);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="cartPanelContainer">
      <button
        id="closeCartPanelButton"
        onClick={closeCartPanel}
        style={{ display: "none" }}
      />
      <label htmlFor="closeCartPanelButton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 0 24 24"
          width="40px"
          fill="#fff"
          style={{ margin: "1em" }}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </label>
      <div className="cartPanelElements">
        {productsInCart.map((product) => (
          <CartEntry
            icon={product.split("||")[2]}
            title={product.split("||")[0]}
            price={product.split("||")[1]}
          />
        ))}
      </div>
    </div>
  );
}
