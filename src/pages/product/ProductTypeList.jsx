import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductTypeList = () => {
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    axios.get("/api/productTypes")
      .then(response => setProductTypes(response.data))
      .catch(error => console.error("Error fetching product types:", error));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Product Type List</h2>
      {productTypes.length === 0 ? (
        <p>No product types available.</p>
      ) : (
        <ul>
          {productTypes.map((type, index) => (
            <li key={index}>{type.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductTypeList;
