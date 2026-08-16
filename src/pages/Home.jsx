import { Link } from "react-router-dom";
import { useState } from "react";
import useProductContext from "../hooks/useProductContext";
import ProductList from "../components/ProductList";
import "../styles/home.css";

const categories = [
  {
    name: "Laptops",
    description: "Power for work and creativity",
  },
  {
    name: "Phones",
    description: "Stay connected everywhere",
  },
  {
    name: "Gaming",
    description: "Gear built for precision",
  },
  {
    name: "Audio",
    description: "Hear every detail",
  },
];

function Home() {
  const { products, loading, error } = useProductContext();

  const [activeCategory, setActiveCategory] = useState(0);

  const featuredProducts = products.slice(0, 3);

  function moveCategory(direction) {
    setActiveCategory((current) => {
      const next =
        (current + direction + categories.length) %
        categories.length;

      return next;
    });
  }

  function getRelativePosition(index) {
    const total = categories.length;

    let difference = index - activeCategory;

    if (difference > total / 2) {
      difference -= total;
    }

    if (difference < -total / 2) {
      difference += total;
    }

    return difference;
  }

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="hero-label">
            APEXGEAR · MODERN TECHNOLOGY
          </p>

          <h1>
            Technology for
            <span>what&apos;s next.</span>
          </h1>

          <p className="hero-description">
            Thoughtfully selected technology for work,
            play, creativity, and everything in between.
          </p>

          <Link
            to="/shop"
            className="hero-button"
          >
            Explore our products
            <span>→</span>
          </Link>
        </div>

        {!loading && !error && featuredProducts.length > 0 && (
          <div className="hero-products">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/shop/${product.id}`}
                className={`hero-product hero-product-${index}`}
              >
                <div className="hero-product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="hero-product-info">
                  <p>{product.category}</p>

                  <h3>{product.name}</h3>

                  <span>
                    KSh{" "}
                    {Number(product.price).toLocaleString("en-KE")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="hero-categories">
          <div className="category-heading">
            <p>EXPLORE</p>

            <h2>Find your gear.</h2>
          </div>

          <div className="category-wheel">
            {categories.map((category, index) => {
              const position = getRelativePosition(index);

              return (
                <button
                  type="button"
                  key={category.name}
                  className={`category-card category-position-${position}`}
                  onClick={() => {
                    if (position === 0) return;

                    moveCategory(position > 0 ? 1 : -1);
                  }}
                >
                  <span className="category-index">
                    0{index + 1}
                  </span>

                  <div>
                    <h3>{category.name}</h3>

                    <p>{category.description}</p>
                  </div>

                  {position === 0 && (
                    <span className="category-arrow">
                      →
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="category-controls">
            <button
              type="button"
              onClick={() => moveCategory(-1)}
              aria-label="Previous category"
            >
              ←
            </button>

            <div className="category-indicator">
              {String(activeCategory + 1).padStart(2, "0")}
              {" / "}
              {String(categories.length).padStart(2, "0")}
            </div>

            <button
              type="button"
              onClick={() => moveCategory(1)}
              aria-label="Next category"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <p className="section-label">
              THE COLLECTION
            </p>

            <h2>Worth a closer look.</h2>
          </div>

          <Link
            to="/shop"
            className="view-all"
          >
            View all products →
          </Link>
        </div>

        {loading && (
          <div className="product-message">
            Loading products...
          </div>
        )}

        {error && !loading && (
          <div className="product-message">
            Unable to load products.
          </div>
        )}

        {!loading && !error && (
          <ProductList products={featuredProducts} />
        )}
      </section>
    </div>
  );
}

export default Home;