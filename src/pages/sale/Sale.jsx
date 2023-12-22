// Sales.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import UpdateSaleModal from './UpdateSaleModal';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const Sales = () => {
  const [sales, setSales] = useState([
    {
      product: 'Product 1',
      price: 50,
      quantity: 2,
      subtotal: 100,
    },
    {
      product: 'Product 2',
      price: 75,
      quantity: 1,
      subtotal: 75,
    },
  ]);
  const [formData, setFormData] = useState({
    date: '',
    customerName: '',
    product: '',
  });
  const [products, setProducts] = useState([
    {
      _id: 1,
      name: 'Product 1',
      price: 50,
    },
    {
      _id: 2,
      name: 'Product 2',
      price: 75,
    },
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSale, setSelectedSale] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get('/api/sales')
      .then((response) => setSales(response.data))
      .catch((error) => console.error('Error fetching sales:', error));

    axios
      .get('/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );

    setSearchResults(results);
  };

  const handleProductSelect = (selectedProduct) => {
    const newSale = {
      product: selectedProduct.name,
      price: selectedProduct.price,
      quantity: 1,
      subtotal: selectedProduct.price,
    };

    setSales((prevSales) => [...prevSales, newSale]);
    setFormData({
      ...formData,
      product: selectedProduct.name,
    });
  };

  const handleQuantityChange = (action, index) => {
    const newSales = [...sales];
    const updatedSale = { ...newSales[index] };

    if (action === 'add') {
      updatedSale.quantity += 1;
    } else if (action === 'subtract') {
      updatedSale.quantity = Math.max(updatedSale.quantity - 1, 0);
    }

    updatedSale.subtotal = updatedSale.price * updatedSale.quantity;
    newSales[index] = updatedSale;
    setSales(newSales);
  };

  const handleEditSale = (sale) => {
    setSelectedSale(sale);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSale = (updatedSale) => {
    setSales((prevSales) =>
      prevSales.map((sale) =>
        sale.product === updatedSale.product ? updatedSale : sale
      )
    );
    setIsUpdateModalOpen(false);
  };

  const handleDeleteSale = (index) => {
    const newSales = [...sales];
    newSales.splice(index, 1);
    setSales(newSales);
  };

  const handleSubmitSales = async () => {
    try {
      await axios.post('/api/submitSales', { sales });
      console.log('Sales submitted successfully');
      setSales([]);
      setFormData({
        date: '',
        customerName: '',
        phoneNumber: '',
        paymentMode:'',
        product: '',
        
      });
    } catch (error) {
      console.error('Error submitting sales:', error);
    }
  };

  const totalSales = sales.reduce((total, sale) => total + sale.subtotal, 0);

  return (
    <div className="flex">
      <div className="">
        {/* Navbar Component */}
        <Navbar />
      </div>
      <div className="w-full pl-64">
        {/* Header Component */}
        <Header />
        <div className="p-10">
          <h2 className="text-2xl font-bold mb-5">Sales</h2>
          <form>
            <label className="flex flex-col">
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              Customer Name:
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              Phone Number:
              <input
                type="number"
                name="phoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              Payment Mode:
              <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleInputChange}
            className=' outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2'
            required
          >
            <option >Transfer</option>
            <option>Cash</option>
            <option>POS</option>
            
          </select>
            </label>
            <br />
            <label className="flex flex-col">
              Product:
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                placeholder="Search and select a product"
                autoComplete="off"
                list="products"
                className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              />
              <datalist id="products" className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2">
                {searchResults.map((product) => (
                  <option key={product._id} value={product.name} />
                ))}
              </datalist>
              <ul>
                {searchResults.map((product, index) => (
                  <li key={index} onClick={() => handleProductSelect(product)}>
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
            </label>
          </form>
          <br />
          <br />
          <div>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sales.map((sale, index) => (
                    <TableRow key={index}>
                      <TableCell>{sale.product}</TableCell>
                      <TableCell>${sale.price}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleQuantityChange('subtract', index)}>-</Button>
                        {sale.quantity}
                        <Button onClick={() => handleQuantityChange('add', index)}>+</Button>
                      </TableCell>
                      <TableCell>${sale.subtotal}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEditSale(sale)}>Edit</Button>
                        <Button onClick={() => handleDeleteSale(index)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <p className=' text-right mr-12 mt-10 text-lg font-semibold'>Total Sales: ${totalSales}</p>
          </div>
          {/* UpdateSaleModal Component */}
          <UpdateSaleModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} sale={selectedSale} onUpdateSale={handleUpdateSale} />
          <button className="bg-[#80FAFA] p-2" onClick={handleSubmitSales}>
            Submit 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sales;
