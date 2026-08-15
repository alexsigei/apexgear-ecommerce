import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import {  useNavigate } from "react-router-dom";

function AdminProducts() {
  const { products, removeProduct, loading, error } = useContext(ProductContext);
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading products...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const handleDelete =  async (id) => {
    const confirmed = window.confirm(`Are you sure you want to delete?`);

    if(confirmed){
      const resp = await removeProduct(id);
      console.log(resp);
    }else{
      console.log('Delete cancelled');
    }
  }

  return (
    <div>
      <div>
        <h1>Manage Admin Products</h1>

      </div>
      
      <div>
        <p>Total products: {products.length}</p>
        <button onClick={()=>navigate("/admin/products/add")}>Add New Product</button>
      </div>
      
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr> 
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={`${product.id} + {index}`}>
                <td>{product.id}</td>
                <td>
                  <img
                    style={{height: '40px', width: '40px', objectFit: 'cover'}}
                    src={product?.image}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product?.category}</td>
                <td>{product?.stock}</td>
                <td>{product?.desc}</td>
                <td>
                  <button onClick={()=>navigate(`/admin/products/edit/${product.id}`)}>Edit</button>
                  <button onClick={()=>handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*<ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} — KSh {product.price}
          </li>
        ))}
      </ul>*/}
    </div>
  );
}

export default AdminProducts;