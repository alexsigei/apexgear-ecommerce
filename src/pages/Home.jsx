import { Link } from "react-router-dom";

function Home() {
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
    </main>
  );
}

export default Home;