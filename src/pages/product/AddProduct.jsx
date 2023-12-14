import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    chassisNumber: "",
    engineNumber: "",
    productPrice: "",
    stockAlert: "",
    brand: "",
  });

  const [brandOptions, setBrandOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);

  useEffect(() => {
    axios.get("/api/brands")
      .then(response => setBrandOptions(response.data))
      .catch(error => console.error("Error fetching brands:", error));

    axios.get("/api/productTypes")
      .then(response => setProductTypeOptions(response.data))
      .catch(error => console.error("Error fetching product types:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/products", formData);
      onAddProduct(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label className='flex flex-col'>
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className='flex flex-col'>
          Product Type:
          <select
            name="productType"
            value={formData.productType}
            onChange={handleInputChange}
            required
          >
            <option disabled>Select a type</option>
            {productTypeOptions.map((type) => (
              <option key={type._id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className='flex flex-col'>
          Chassis Number:
          <input
            type="text"
            name="chassisNumber"
            value={formData.chassisNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className='flex flex-col'>
          Engine Number:
          <input
            type="text"
            name="engineNumber"
            value={formData.engineNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className='flex flex-col'>
          Product Price:
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className='flex flex-col'>
          Stock Alert:
          <input
            type="number"
            name="stockAlert"
            value={formData.stockAlert}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className='flex flex-col'>
          Brand:
          <select
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
          >
            <option disabled>Select a brand</option>
            {brandOptions.map((brand) => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button className='bg-[#80FAFA] p-2' type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
