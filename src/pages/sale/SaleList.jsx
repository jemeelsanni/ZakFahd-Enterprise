import React, { useEffect, useState } from "react";
import axios from "axios";

const SaleList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get("/api/sales")
      .then(response => setSales(response.data))
      .catch(error => console.error("Error fetching sales:", error));
  }, []);

  const calculateTotalAmount = () => {
    return sales.reduce((total, sale) => total + sale.subtotal, 0);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Sale List</h2>
      {sales.length === 0 ? (
        <p>No sales available.</p>
      ) : (
        <div>
          <table className="w-full border-collapse border border-[#0B245B6B]">
            <thead>
              <tr className="bg-[#80FAFA]">
                <th className="border border-[#0B245B6B] p-2">Date</th>
                <th className="border border-[#0B245B6B] p-2">Customer Name</th>
                <th className="border border-[#0B245B6B] p-2">Product</th>
                <th className="border border-[#0B245B6B] p-2">Price</th>
                <th className="border border-[#0B245B6B] p-2">Quantity</th>
                <th className="border border-[#0B245B6B] p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={index}>
                  <td className="border border-[#0B245B6B] p-2">{sale.date}</td>
                  <td className="border border-[#0B245B6B] p-2">{sale.customerName}</td>
                  <td className="border border-[#0B245B6B] p-2">{sale.product}</td>
                  <td className="border border-[#0B245B6B] p-2">{sale.price}</td>
                  <td className="border border-[#0B245B6B] p-2">{sale.quantity}</td>
                  <td className="border border-[#0B245B6B] p-2">{sale.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <strong>Total Amount:</strong> {calculateTotalAmount()}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleList;
