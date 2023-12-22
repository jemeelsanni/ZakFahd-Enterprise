// Receipt.js
import React from "react";

const Receipt = ({ sale, onClose }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden max-w-md p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Receipt</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            Close Receipt
          </button>
        </div>
        <div className="text-gray-600">
          <h3 className="text-lg font-semibold mb-4">Sale Details</h3>
          <p>Date: {sale.date}</p>
          <p>Customer Name: {sale.customerName}</p>
          <p>Phone Number: {sale.phoneNumber}</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Products:</h3>
          <ul>
            {sale.products.map((product, index) => (
              <li key={index} className="mb-2">
                {product.name} - ${product.price} (Quantity: {product.quantity})
                <p>Chassis Number: {product.chassisNumber}</p>
                <p>Model Number: {product.modelNumber}</p>
                <p>Engine Number: {product.engineNumber}</p>
                <p>Color: {product.color}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4">Total: ${sale.total}</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
