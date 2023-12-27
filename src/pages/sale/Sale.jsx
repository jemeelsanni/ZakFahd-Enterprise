import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import UpdateSaleModal from "./UpdateSaleModal";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import Cookie from "js-cookie";
const Sales = () => {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    // date: "",
    customerName: "",
    phoneNumber: "",
    paymentMode: "",
    // product: "",
  });
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  console.log(formData);
  useEffect(() => {
    axios
      .get("/api/sales")
      .then((response) => setSales(response.data))
      .catch((error) => console.error("Error fetching sales:", error));

    axios
      .get("/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  console.log(selectedSale);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(sales);
  const getAllProducts = async (inputValue) => {
    const token = Cookie.get("accessToken");
    try {
      const response = await axios.get(
        // eslint-disable-next-line no-undef
        `${process.env.ENV_BACKEND_URL}/api/v1/product?limit=10&page=1&search_query=${searchTerm}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data.data.products);
      const options = response.data.data.products.map((product) => ({
        value: product._id,
        label: `${product.name} - $${product.price}`,
      }));
      setProductOptions(options);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleSearchChange = (e) => {
    console.log(searchTerm);
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleProductSelect = (selectedProduct) => {
    if (!selectedProduct) {
      console.error("No product selected");
      return; // Exit the function if no product is selected
    }
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

    if (action === "add") {
      updatedSale.quantity += 1;
    } else if (action === "subtract") {
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
  console.log(products);
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
      await axios.post("/api/submitSales", { sales });
      console.log("Sales submitted successfully");

      setFormData({
        customerName: "",
        phoneNumber: "",
        paymentMode: "",
      });
    } catch (error) {
      console.error("Error submitting sales:", error);
    }
  };
  useEffect(() => {
    // handleSearchChange();
    getAllProducts();
  }, [searchTerm]);
  const loadOptions = async (inputValue) => {
    const token = Cookie.get("accessToken");
    try {
      const response = await axios.get(
        // eslint-disable-next-line no-undef
        `${process.env.ENV_BACKEND_URL}/api/v1/product?limit=10&page=1&search_query=${inputValue}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data.products.map((product) => ({
        value: product.slug,
        label: `${product.name}`,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const totalSales = sales.reduce((total, sale) => total + sale.subtotal, 0);
  console.log(totalSales);
  const handleSelectChange = (selectedOption) => {
    if (!selectedOption) {
      return; // No option is selected
    }

    const selectedProduct = products.find(
      (p) => p.slug === selectedOption.value
    );
    if (selectedProduct) {
      const newSale = {
        slug: selectedProduct.slug,
        type: selectedProduct.type,
        product: selectedProduct.name,
        price: selectedProduct.price,
        brand: selectedProduct.brand,
        quantity: 1,
        subtotal: selectedProduct.price,
      };

      setSales([...sales, newSale]);
      console.log(selectedProduct);
    } else {
      console.error("Selected product not found");
    }
  };
  const addSale = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = Cookie.get("accessToken");
    try {
      const response = await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.ENV_BACKEND_URL}/api/v1/sale`,
        {
          customerName: formData.customerName,
          phoneNumber: formData.phoneNumber,
          paymentMode: formData.paymentMode,
          items: sales,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      toast.success("Successful");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex">
      <div className="">
        {/* Navbar Component */}
        <Navbar />
      </div>
      <div className="w-full pl:2 md:pl-64">
        {/* Header Component */}
        <Header />
        <div className="p-10">
          <h2 className="text-2xl text-[#0B245B] font-bold mb-5">Sales</h2>
          <form>
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
                className=" outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                required
              >
                <option>Transfer</option>
                <option>Cash</option>
                <option>POS</option>
              </select>
            </label>
            <br />
            {/* <label className="flex flex-col">
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
              <datalist
                id="products"
                className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
              >
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
            </label> */}
            <label className="flex flex-col">
              Product:
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                onChange={handleSelectChange}
                className="basic-single"
                classNamePrefix="select"
              />
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
                      <TableCell><span>&#8358;</span>{sale.price}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleQuantityChange("subtract", index)
                          }
                        >
                          -
                        </Button>
                        {sale.quantity}
                        <Button
                          onClick={() => handleQuantityChange("add", index)}
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell><span>&#8358;</span>{sale.subtotal}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleDeleteSale(index)}>
                          <DeleteIcon />
                        </Button>
                        <Button onClick={() => handleEditSale(sale)}>
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <p className=" text-right mr-12 mt-10 text-lg font-semibold">
              Total Sales: <span>&#8358;</span>{totalSales}
            </p>
          </div>
          {/* UpdateSaleModal Component */}
          <UpdateSaleModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            sale={selectedSale}
            onUpdateSale={handleUpdateSale}
          />
          <button
            className="text-base w-[140px] font-semibold inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={addSale}
          >
            {!isLoading ? "Submit" : <ClipLoader size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sales;
