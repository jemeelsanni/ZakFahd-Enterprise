// ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateProductFormModal from "./UpdateProductFormModal";
import Navbar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import EditIcon from "@mui/icons-material/Edit";
import Cookie from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import { mockProducts, mockBrands, mockProductTypes } from "./mock";
import { Pagination } from "@mui/material";
import { ClipLoader } from "react-spinners";
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
import EditProductModal from "../../components/modals/EditProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterProductType, setFilterProductType] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  useEffect(() => {
    getAllProducts();
    setBrands(mockBrands);
    setProductTypes(mockProductTypes);
  }, [currentPage, searchTerm, filterBrand, filterProductType]);
  const getAllProducts = async () => {
    setIsLoading(true);
    const token = Cookie.get("accessToken");
    try {
      const response = await axios.get(
        `${process.env.ENV_BACKEND_URL}/api/v1/product?limit=10&page=${currentPage}&search_query=${searchTerm}&brand=${filterBrand}&type=${filterProductType}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setProducts(response.data.data.products);
      const totalProducts = Number(
        response.data.data.count.totalnumberofproducts
      );
      const pages = Math.ceil(totalProducts / 10);
      setTotalPages(pages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleSearchChange = (e) => {
    console.log(searchTerm);
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
          <div>
            {isLoading ? (
              <div className="mt-[20px]">
                <ClipLoader />
              </div>
            ) : products.length > 0 ? (
              <>
                {" "}
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
                      {products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.type}</TableCell>
                          <TableCell><span>&#8358;</span>{product.price}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.brand}</TableCell>
                          <TableCell>
                            <EditProductModal
                              product={product}
                              getAllProducts={getAllProducts}
                            />
                            {/* <Button onClick={() => handleEditProduct(product._id)}>
                        <EditIcon />
                      </Button> */}
                      {/* <Button onClick={() => handleDeleteProduct(product._id)}>
                        <DeleteIcon />
                      </Button> */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="mt-[10px]">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
              </>
            ) : (
              <div className="text-center mt-5">
                <span className="text-xl">No products found</span>
              </div>
            )}
          </div>

          {/* Integrate UpdateProductFormModal */}
          {/* <UpdateProductFormModal
            productId={selectedProductId}
            isOpen={isUpdateModalOpen}
            onRequestClose={handleCloseModal}
            onUpdateProduct={handleUpdateProduct}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
