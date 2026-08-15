import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/shop/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route path="/admin/products" element={<AdminProducts />}/>
          <Route path="/admin/products/add" element={<AddProduct />}/>
          <Route path="/admin/products/edit/:pid" element={<EditProduct />}/>
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
