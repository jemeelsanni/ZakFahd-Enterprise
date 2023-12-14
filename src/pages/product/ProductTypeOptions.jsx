import React, { useState } from "react";
import axios from "axios";

const ProductTypeOptions = ({ onAddProductType }) => {
  const [newProductType, setNewProductType] = useState("");

  const handleInputChange = (e) => {
    setNewProductType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newProductType.trim() === "") {
      return;
    }

    try {
      const response = await axios.post("/api/productTypes", {
        productType: newProductType,
      });
      onAddProductType(response.data);
    } catch (error) {
      console.error("Error adding product type:", error);
    }

    setNewProductType("");
  };

  return (
    <div>
      <h2>Add Product Type</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Type Name:
          <input
            type="text"
            value={newProductType}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add Product Type</button>
      </form>
    </div>
  );
};

export default ProductTypeOptions;
