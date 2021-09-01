import { Link } from "react-router-dom";
import axios from "axios";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/Home.css";

import icon from "../assets/image.png";
import { useEffect, useState } from "react";

export default function Home() {
  /* useState for product list */
  const [products, setProducts] = useState([]);

  /* Template for each product card */
  const ProductCard = ({ onClickProduct, icon, productInfo }) => (
    <div className="product" onClick={() => onClickProduct(productInfo._id)}>
      <img src={icon} className="productImage" alt="" />
      <div className="productDetails">
        <div className="name">{productInfo.title}</div>
        <div className="price">₹{productInfo.price}</div>
      </div>
    </div>
  );

  function onClickProduct(productId) {
    console.log(`taking you to the product page for ${productId}`);
  }

  useEffect(() => {
    /* Fetch 40 products by default */
    axios
      .get("https://ccch1.sse.codesandbox.io/products/40")
      .then((res) => {
        console.log(res.data);

        setProducts(res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, []);

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <div className="headerBar">
        <div className="titleBar">
          <div className="titleText">Shopping</div>
          <Link to={"/login"} className="loginButton">
            Log In
          </Link>
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
          <ProductCard
            onClickProduct={onClickProduct}
            icon={icon}
            productInfo={product}
          />
        ))}
      </div>
    </div>
  );
}
