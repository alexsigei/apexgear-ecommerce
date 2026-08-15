import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductContext from "../hooks/useProductContext";

function AddProduct() {
  const navigate = useNavigate();
  const {
    addProduct,
    loading,
    error
  } = useProductContext();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: '',
    description: '',
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit product data: ', formData);

    const resp = await addProduct(formData);

    if(resp){
      navigate('/admin/products/');
    }
  }

  return (
  <div>
    <div>
      <h1>Add Product</h1>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Enter Product Name" 
            required
          />
        </div>
        <div>
          <label htmlFor="price">Product Price</label>
          <input 
            type="number" 
            placeholder="Enter Product Price" 
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
         <div>
          <label htmlFor="category">Product Category</label>
          <select 
            name="category" 
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value={''}>--Select Product Category--</option>
            <option value={'Laptops'}>Laptops</option>
            <option value={'Phones'}>Phones</option>
            <option value={'Gaming'}>Gaming</option>
            <option value={'Audio'}>Audio</option>
          </select>
        </div>
        <div>
          <label htmlFor="stock">Product Stock</label>
          <input 
            type="number" 
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter Product Stock" 
            required
          />
        </div>
        <div>
          <label htmlFor="category">Product Image</label>
          <input 
            type="text" 
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter Product URL" 
            required
          />
        </div>
        <div>
          <label htmlFor="description">Product Desc</label>
          <textarea 
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange} 
            placeholder="Enter Product Desc" 
          />
        </div>
        <div>
          <button type="button" onClick={()=>{navigate(-1)}}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>);

}

export default AddProduct;