import "../styles/layout.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} ApexGear. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;