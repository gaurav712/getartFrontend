import { Link } from "react-router-dom";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/Home.css";

import icon from "../assets/image.png";

export default function Home() {
  function onClickProduct() {
    console.log("taking you to the product page");
  }

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
        <div className="product" onClick={onClickProduct}>
          <img src={icon} className="productImage" alt="" />
          <div className="productDetails">
            <div className="name">Product Name</div>
            <div className="price">₹ 200</div>
          </div>
        </div>
        <div className="product" onClick={onClickProduct}>
          <img src={icon} className="productImage" alt="" />
          <div className="productDetails">
            <div className="name">Product Name</div>
            <div className="price">₹ 200</div>
          </div>
        </div>
        <div className="product" onClick={onClickProduct}>
          <img src={icon} className="productImage" alt="" />
          <div className="productDetails">
            <div className="name">Product Name</div>
            <div className="price">₹ 200</div>
          </div>
        </div>
        <div className="product" onClick={onClickProduct}>
          <img src={icon} className="productImage" alt="" />
          <div className="productDetails">
            <div className="name">Product Name</div>
            <div className="price">₹ 200</div>
          </div>
        </div>
        <div className="product" onClick={onClickProduct}>
          <img src={icon} className="productImage" alt="" />
          <div className="productDetails">
            <div className="name">Product Name</div>
            <div className="price">₹ 200</div>
          </div>
        </div>
        <div className="product" onClick={onClickProduct}>
          <img src={icon} className="productImage" alt="" />
          <div className="productDetails">
            <div className="name">Product Name</div>
            <div className="price">₹ 200</div>
          </div>
        </div>
        <div className="product" onClick={onClickProduct}>
          <img src={icon} className="productImage" alt="" />
          <div className="productDetails">
            <div className="name">Product Name</div>
            <div className="price">₹ 200</div>
          </div>
        </div>
        <div className="product" onClick={onClickProduct}>
          <img src={icon} className="productImage" alt="" />
          <div className="productDetails">
            <div className="name">Product Name</div>
            <div className="price">₹ 200</div>
          </div>
        </div>
        <div className="product" onClick={onClickProduct}>
          <img src={icon} className="productImage" alt="" />
          <div className="productDetails">
            <div className="name">Product Name</div>
            <div className="price">₹ 200</div>
          </div>
        </div>
      </div>
    </div>
  );
}
