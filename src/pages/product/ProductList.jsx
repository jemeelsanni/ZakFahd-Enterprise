import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="w-full border-collapse border border-[#0B245B6B]">
          <thead>
            <tr className="bg-[#80FAFA]">
              <th className="border border-[#0B245B6B] p-2">Name</th>
              <th className="border border-[#0B245B6B] p-2">Type</th>
              <th className="border border-[#0B245B6B] p-2">Chassis Number</th>
              <th className="border border-[#0B245B6B] p-2">Engine Number</th>
              <th className="border border-[#0B245B6B] p-2">Price</th>
              <th className="border border-[#0B245B6B] p-2">Stock Alert</th>
              <th className="border border-[#0B245B6B] p-2">Brand</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border border-[#0B245B6B] p-2">{product.productName}</td>
                <td className="border border-[#0B245B6B] p-2">{product.productType}</td>
                <td className="border border-[#0B245B6B] p-2">{product.chassisNumber}</td>
                <td className="border border-[#0B245B6B] p-2">{product.engineNumber}</td>
                <td className="border border-[#0B245B6B] p-2">{product.productPrice}</td>
                <td className="border border-[#0B245B6B] p-2">{product.stockAlert}</td>
                <td className="border border-[#0B245B6B] p-2">{product.brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
