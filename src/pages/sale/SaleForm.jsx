import React, { useState, useEffect } from "react";
import axios from "axios";

const SaleForm = ({ onAddSale }) => {
  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    product: "",
    price: "",
    quantity: 0,
    subtotal: 0,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuantityChange = (action) => {
    setFormData((prevData) => ({
      ...prevData,
      quantity: action === "add" ? prevData.quantity + 1 : Math.max(prevData.quantity - 1, 0),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product || !formData.price || formData.quantity <= 0) {
      return;
    }

    try {
      const response = await axios.post("/api/sales", formData);
      onAddSale(response.data);
    } catch (error) {
      console.error("Error adding sale:", error);
    }

    setFormData({
      date: "",
      customerName: "",
      product: products.length > 0 ? products[0].name : "",
      price: products.length > 0 ? products[0].price : "",
      quantity: 0,
      subtotal: 0,
    });
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Make Sale</h2>
      <form onSubmit={handleSubmit}>
        <label className='flex flex-col'>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className='flex flex-col'>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className='flex flex-col'>
          Product:
          <select
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            required
          >
            {products.map((product) => (
              <option key={product._id} value={product.name}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className='flex flex-col'>
          Quantity:
          <div className='flex'>
            <button
              type="button"
              onClick={() => handleQuantityChange("subtract")}
            >
              -
            </button>
            <span>{formData.quantity}</span>
            <button
              type="button"
              onClick={() => handleQuantityChange("add")}
            >
              +
            </button>
          </div>
        </label>
        <br />
        <button className='bg-[#80FAFA] p-2' type="submit">Submit Sale</button>
      </form>
    </div>
  );
};

export default SaleForm;
