/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import axios from "axios";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const AddProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    productPrice: "",
    stockAlert: "",
    brand: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addProducts = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = Cookie.get("accessToken");
    try {
      const response = await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.ENV_BACKEND_URL}/api/v1/product`,
        {
          name: formData.productName,
          price: formData.productPrice,
          type: formData.productType,
          brand: formData.brand,
          quantity: formData.stockAlert,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      toast.success("Successful");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
          <h2 className="text-2xl text-[#0B245B] font-bold mb-5">
            Add Product
          </h2>
          <form onSubmit={addProducts}>
            <label className="flex flex-col">
              Product Name:
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className=" outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              Product Type:
              <input
                type="text"
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                className=" outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              Product Price:
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleInputChange}
                className=" outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              Stock Alert:
              <input
                type="number"
                name="stockAlert"
                value={formData.stockAlert}
                onChange={handleInputChange}
                className=" outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              Brand:
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className=" outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              >
                <option>TVS</option>
                <option>Bajaj</option>
                <option>Haojue</option>
                <option>Others</option>
              </select>
            </label>
            <br />

            <button
              className="text-base font-semibold inline-flex justify-center rounded-md border border-transparent w-[164px] bg-blue-100 px-4 py-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              type="submit"
            >
              {!isLoading ? " Add Product" : <ClipLoader size={16} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
