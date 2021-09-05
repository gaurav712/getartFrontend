import axios from "axios";
import { useState } from "react";
import TextEditor from "./TextEditor";
import Helmet from "react-helmet";

import "../assets/stylesheets/Common.css";
import "../assets/stylesheets/AddProduct.css";

const BACKEND_URI = "https://getart-backend.herokuapp.com";
const CLOUDINARY_UPLOAD_URI =
  "https://api.cloudinary.com/v1_1/zerocool/image/upload";
const UPLOAD_PRESET = "ynnem213";

export default function AddProduct() {
  const [imageFile, setImageFile] = useState(null);

  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    seoTitle: "",
    seoDescription: ""
  });

  /* Callback that updates the value */
  function handleEditorHtmlChange(html) {
    setProduct({ ...product, description: html });
  }

  /* Save product info to the database */
  function saveProductToDB(imageUrl) {
    const productInfo = {
      title: product.title,
      price: product.price,
      description: product.description,
      coverImage: imageUrl,
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription
    };

    axios
      .post(`${BACKEND_URI}/products/add`, productInfo)
      .then((res) => {
        console.log(res);
        alert("Product Added!");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  /* On submit form */
  function onAddProduct(e) {
    /* Prevent default behaviour */
    e.preventDefault();

    console.log(product);

    /* Prepare the productImage */
    if (imageFile && /\.(|jpe?g|png)$/i.test(imageFile.name)) {
      var formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      /* Now push the image to cloudinary */
      axios
        .post(CLOUDINARY_UPLOAD_URI, formData)
        .then((res) => {
          console.log(res);
          // setProduct({ ...product, coverImage: res.data.url });
          saveProductToDB(res.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Helmet>
        <title>Add a Product</title>
        <meta name="description" content="Add a product to the database" />
      </Helmet>
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
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <span
              className="file-custom"
              placeholder={imageFile ? imageFile.name : "Upload Cover Image"}
            ></span>
          </label>
        </div>
        {/* No product variants feature for now */}
        <div className="dataSection" style={{ display: "none" }}>
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
            onChange={(e) =>
              setProduct({ ...product, seoTitle: e.target.value })
            }
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
    </>
  );
}
