import React, { useState } from "react";
import axios from "axios";

const BrandOptions = ({ onAddBrand }) => {
  const [newBrand, setNewBrand] = useState("");

  const handleInputChange = (e) => {
    setNewBrand(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newBrand.trim() === "") {
      return;
    }

    try {
      const response = await axios.post("/api/brands", { brand: newBrand });
      onAddBrand(response.data);
    } catch (error) {
      console.error("Error adding brand:", error);
    }

    setNewBrand("");
  };

  return (
    <div>
      <h2>Add Brand</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Brand Name:
          <input
            type="text"
            value={newBrand}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add Brand</button>
      </form>
    </div>
  );
};

export default BrandOptions;
