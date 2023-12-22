import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPurchase = ({ onAddPurchase }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    productPrice: "",
    stockAlert: "",
    brand: "",
    quantity: "",
  });

  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/brands")
      .then((response) => setBrandOptions(response.data))
      .catch((error) => console.error("Error fetching brands:", error));
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
      const response = await axios.post("/api/purchases", formData);
      onAddPurchase(response.data);
    } catch (error) {
      console.error("Error adding purchase:", error);
    }
  };

  return (
    <div>
      <h2>Add Purchase</h2>
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col">
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
        <label className="flex flex-col">
          Product Type:
          <input
            type="text"
            name="productType"
            value={formData.productType}
            onChange={handleInputChange}
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
        <button type="submit">Add Purchase</button>
      </form>
    </div>
  );
};

export default AddPurchase;
