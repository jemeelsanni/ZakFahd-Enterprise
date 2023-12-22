
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProductForm = ({ productId, onUpdateProduct }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    productPrice: "",
    stockAlert: "",
    brand: "",
  });

  const [brandOptions, setBrandOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then(response => setFormData(response.data))
      .catch(error => console.error("Error fetching product:", error));

    axios.get("/api/brands")
      .then(response => setBrandOptions(response.data))
      .catch(error => console.error("Error fetching brands:", error));

    axios.get("/api/productTypes")
      .then(response => setProductTypeOptions(response.data))
      .catch(error => console.error("Error fetching product types:", error));
  }, [productId]);

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
      await axios.put(`/api/products/${productId}`, formData);
      onUpdateProduct(formData);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-5">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label htmlFor="productType" className="block text-sm font-medium text-gray-600">
            Product Type
          </label>
          <input
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
           
        </div>

        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-600">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label htmlFor="stockAlert" className="block text-sm font-medium text-gray-600">
            Stock Alert
          </label>
          <input
            type="number"
            id="stockAlert"
            name="stockAlert"
            value={formData.stockAlert}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-600">
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>Select Brand</option>
            <option value="" >TVS</option>
            <option value="" >Bajaj</option>
            <option value="" >Haojue</option>

            
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
