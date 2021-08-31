import axios from "axios";
import { useState } from "react";
import TextEditor from "./TextEditor";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/AddProduct.css";

export default function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    // coverImage: null,
    seoTitle: "",
    seoDescription: ""
  });

  /* Callback that updates the value */
  function handleEditorHtmlChange(html) {
    setProduct({ ...product, description: html });
  }

  /* On submit form */
  function onAddProduct(e) {
    /* Prevent default behaviour */
    e.preventDefault();

    console.log(product);

    /* Save product info to the database */
    axios
      .post("https://ccch1.sse.codesandbox.io/products/add", product)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  return (
    <form className="container" onSubmit={onAddProduct}>
      <div className="dataSection">
        <div className="header">Product Title</div>
        <input
          type="text"
          className="textInput"
          placeholder="Enter Title Here"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
      </div>
      <div className="dataSection">
        <div className="header">Price</div>
        <input
          type="number"
          className="textInput"
          placeholder="Enter Price (in ₹)"
          value={product.price === 0 ? "" : product.price}
          onChange={(e) =>
            setProduct({ ...product, price: parseInt(e.target.value, 10) })
          }
        />
      </div>
      <div className="header">Product Description</div>
      <TextEditor
        textEditorHtml={product.description}
        handleEditorHtmlChange={handleEditorHtmlChange}
      />
      <div className="dataSection">
        <div className="header">Attach Cover Image</div>
        <label className="file">
          <input
            type="file"
            // onChange={(e) =>
            //   setProduct({ ...product, coverImage: e.target.files[0] })
            // }
          />
          <span
            className="file-custom"
            placeholder={
              product.coverImage
                ? product.coverImage.name
                : "Upload Cover Image"
            }
          ></span>
        </label>
      </div>
      <div className="dataSection">
        <div className="header" style={{ marginBottom: "0.2rem" }}>
          Product Variants
        </div>
        <p style={{ fontSize: "0.9rem" }}>
          This product has multiple variants. Like different sizes or colours.
        </p>
        <button className="submitButton" style={{ width: "fit-content" }}>
          Add Variant Option
        </button>
      </div>
      <div className="dataSection">
        <div className="header">SEO Meta Details</div>
        <input
          type="text"
          className="textInput"
          placeholder="SEO Title"
          value={product.seoTitle}
          onChange={(e) => setProduct({ ...product, seoTitle: e.target.value })}
        />
        <textarea
          className="textInput"
          style={{ marginTop: "1.5rem" }}
          rows="8"
          placeholder="SEO Description"
          value={product.seoDescription}
          onChange={(e) =>
            setProduct({ ...product, seoDescription: e.target.value })
          }
        />
      </div>
      <center>
        <input className="submitButton" type="submit" value="Add Product" />
      </center>
    </form>
  );
}
