import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import axios from "axios";

const AddProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    productPrice: "",
    stockAlert: "",
    brand: "",
  });

  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    axios.get("/api/brands")
      .then(response => setBrandOptions(response.data))
      .catch(error => console.error("Error fetching brands:", error));
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
  <div className="flex">
    <div>
      <Navbar />
    </div>
    <div className=" w-full pl:2 md:pl-64">
      <Header />
      <div className="p-10 w-full">
    <h2 className="text-2xl text-[#0B245B] font-bold mb-5">Add Product</h2>
    <form onSubmit={handleSubmit}>
      <label className='flex flex-col'>
        Product Name:
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
          className=' outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2'
          required
        />
      </label>
      <br />
      <label className='flex flex-col'>
        Product Type:
        <input
          type="text"
          name="productType"
            value={formData.productType}
            onChange={handleInputChange}
            className=' outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2'
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
            className=' outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2'
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
            className=' outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2'
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
            className=' outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2'
            required
          >
            <option >TVS</option>
            <option>Bajaj</option>
            <option>Haojue</option>
            <option>Others</option>

            
          
          </select>
        </label>
        <br />
        <button className='text-base font-semibold inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' type="submit">Add Product</button>
      </form>
    </div>
    </div>
  </div>
  );
};

export default AddProductForm;
