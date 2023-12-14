import React, { useEffect, useState } from "react";
import axios from "axios";

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get("/api/brands")
      .then(response => setBrands(response.data))
      .catch(error => console.error("Error fetching brands:", error));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Brand List</h2>
      {brands.length === 0 ? (
        <p>No brands available.</p>
      ) : (
        <ul>
          {brands.map((brand, index) => (
            <li key={index}>{brand.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrandList;
