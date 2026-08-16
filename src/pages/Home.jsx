import { Link } from "react-router-dom";
import useProductContext from "../hooks/useProductContext";
import ProductList from "../components/ProductList";

function Home() {
  const { products, loading } = useProductContext();

  const featuredProducts = products.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">WELCOME TO APEXGEAR</p>

          <h1>
            Gear up for
            <span> what's next.</span>
          </h1>

          <p>
            Discover laptops, phones, gaming gear, audio equipment,
            and accessories built for work, play, and everything in
            between.
          </p>

          <Link to="/shop" className="button">
            Shop Now
          </Link>
        </div>
      </section>

      <section>
        <h2>Featured Products</h2>

        {loading ? (
          <p>Loading featured products...</p>
        ) : (
          <ProductList products={featuredProducts} />
        )}

        <Link to="/shop">
          View All Products
        </Link>
      </section>
    </main>
  );
}

export default Home;