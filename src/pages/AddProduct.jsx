import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductContext from "../hooks/useProductContext";
import "../styles/product-form.css";

function AddProduct() {
  const navigate = useNavigate();

  const {
    addProduct,
    loading,
    error,
  } = useProductContext();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await addProduct(formData);

    if (resp) {
      navigate("/admin/products");
    }
  };

  return (
    <main className="product-form-page">

      {/* HEADER */}

      <section className="product-form-header">

        <div>
          <p className="product-form-eyebrow">
            APEXGEAR · INVENTORY
          </p>

          <h1>
            Add product
          </h1>

          <p>
            Add a new piece of technology to your
            ApexGear collection.
          </p>
        </div>

      </section>


      {/* FORM */}

      <section className="product-form-card">

        <form onSubmit={handleSubmit}>

          <div className="product-form-layout">

            {/* LEFT SIDE */}

            <div className="product-form-fields">

              <div className="form-section-heading">
                <span>01</span>

                <div>
                  <h2>Product details</h2>
                  <p>
                    Basic information about the product.
                  </p>
                </div>
              </div>


              {/* Product name */}

              <div className="form-field form-field-full">

                <label htmlFor="name">
                  Product name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. MacBook Air M3"
                  required
                />

              </div>


              {/* Category + Price */}

              <div className="form-field-row">

                <div className="form-field">

                  <label htmlFor="category">
                    Category
                  </label>

                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select category
                    </option>

                    <option value="Laptops">
                      Laptops
                    </option>

                    <option value="Phones">
                      Phones
                    </option>

                    <option value="Gaming">
                      Gaming
                    </option>

                    <option value="Audio">
                      Audio
                    </option>
                  </select>

                </div>


                <div className="form-field">

                  <label htmlFor="price">
                    Price
                  </label>

                  <div className="input-with-prefix">

                    <span>KSh</span>

                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      required
                    />

                  </div>

                </div>

              </div>


              {/* Stock */}

              <div className="form-field">

                <label htmlFor="stock">
                  Stock quantity
                </label>

                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter available quantity"
                  min="0"
                  required
                />

              </div>


              {/* Image URL */}

              <div className="form-field">

                <label htmlFor="image">
                  Product image URL
                </label>

                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />

              </div>


              {/* Description */}

              <div className="form-field">

                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the product..."
                  rows="5"
                />

              </div>

            </div>


            {/* RIGHT SIDE */}

            <aside className="product-preview">

              <div className="preview-header">
                <span>PREVIEW</span>
              </div>


              <div className="preview-image">

                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Product preview"
                  />
                ) : (
                  <div className="preview-placeholder">
                    <span>+</span>
                    <p>
                      Product image
                    </p>
                  </div>
                )}

              </div>


              <div className="preview-info">

                <span className="preview-category">
                  {formData.category || "CATEGORY"}
                </span>

                <h3>
                  {formData.name || "Product name"}
                </h3>

                <p>
                  {formData.description ||
                    "Your product description will appear here."}
                </p>

                <strong>
                  {formData.price
                    ? `KSh ${Number(
                        formData.price
                      ).toLocaleString("en-KE")}`
                    : "KSh 0"}
                </strong>

              </div>

            </aside>

          </div>


          {/* ERROR */}

          {error && (
            <div className="product-form-error">
              {error}
            </div>
          )}


          {/* ACTIONS */}

          <div className="product-form-actions">

            <button
              type="button"
              className="form-cancel-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="form-submit-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save product"}
              {!loading && <span>→</span>}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default AddProduct;