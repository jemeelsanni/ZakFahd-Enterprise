// ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateProductFormModal from "./UpdateProductFormModal";
import Navbar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {mockProducts, mockBrands, mockProductTypes} from "./mock"
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



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterProductType, setFilterProductType] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    // axios
    //   .get("/api/products")
    //   .then((response) => setProducts(response.data))
    //   .catch((error) => console.error("Error fetching products:", error));

    // axios
    //   .get("/api/brands")
    //   .then((response) => setBrands(response.data))
    //   .catch((error) => console.error("Error fetching brands:", error));

    // axios
    //   .get("/api/productTypes")
    //   .then((response) => setProductTypes(response.data))
    //   .catch((error) => console.error("Error fetching product types:", error));

    setProducts(mockProducts);
    setBrands(mockBrands);
    setProductTypes(mockProductTypes);
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleBrandFilterChange = (e) => {
    const selectedBrand = e.target.value;
    setFilterBrand(selectedBrand);
  };

  const handleProductTypeFilterChange = (e) => {
    const selectedProductType = e.target.value;
    setFilterProductType(selectedProductType);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesBrand = !filterBrand || product.brand === filterBrand;
    const matchesProductType =
      !filterProductType || product.productType === filterProductType;

    return matchesSearch && matchesBrand && matchesProductType;
  });

  const handleDeleteProduct = async (productId) => {
    try {
      // await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (productId) => {
    setSelectedProductId(productId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProductId(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="flex">
      <div>
        <Navbar />
      </div>
      <div className="w-full pl:2 md:pl-64">
        <Header />
        <div className="p-10">
          <h2 className="text-2xl text-[#0B245B] font-bold mb-5">
            Product List
          </h2>
          <Link to="/addproduct">
            <button className="text-base font-semibold inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              Add Product
            </button>
          </Link>
          <br />
          <br />
          <div className="flex flex-col md:flex-row gap-2 mb-3">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mr-3 p-2 w-full rounded-md outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] "
            />
            <select
              onChange={handleBrandFilterChange}
              className=" mr-2 w-full outline-none rounded-md border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
            >
              <option value="">Filter by Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
            <select
              onChange={handleProductTypeFilterChange}
              className="mr-2 w-full outline-none rounded-md border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
            >
              <option value="">Filter by Product Type</option>
              {productTypes.map((type) => (
                <option key={type._id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <br />
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Product Type</TableCell>
                  <TableCell>Product Price</TableCell>
                  <TableCell>Stock Alert</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.productType}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stockAlert}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditProduct(product._id)}>
                        <EditIcon/>
                      </Button>
                      <Button onClick={() => handleDeleteProduct(product._id)}>
                        <DeleteIcon/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Integrate UpdateProductFormModal */}
          <UpdateProductFormModal
            productId={selectedProductId}
            isOpen={isUpdateModalOpen}
            onRequestClose={handleCloseModal}
            onUpdateProduct={handleUpdateProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
