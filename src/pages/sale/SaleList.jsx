import { useState, useEffect } from "react";

import Navbar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import ReceiptModal from "../../components/modals/Receipt";
import { ClipLoader } from "react-spinners";
import Cookie from "js-cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Pagination } from "@mui/material";
import axios from "axios";
const SaleList = () => {
  const [sales, setSales] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  // useEffect(() => {
  //   const mockSalesData = [
  //     {
  //       id: 1,
  //       date: "2023-01-01",
  //       customerName: "John Doe",
  //       phoneNumber: "09068922344",
  //       status: "completed",
  //       total: 100,
  //       products: [
  //         { name: "Product A", price: 50, quantity: 2 },
  //         { name: "Product B", price: 25, quantity: 1 },
  //       ],
  //     },
  //   ];

  //   setSales(mockSalesData);
  // }, []);

  useEffect(() => {
    getAllProducts();
  }, [currentPage]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const getAllProducts = async () => {
    setIsLoading(true);
    const token = Cookie.get("accessToken");
    try {
      const response = await axios.get(
        // eslint-disable-next-line no-undef
        `${process.env.ENV_BACKEND_URL}/api/v1/sale?limit=10&page=${currentPage}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSales(response.data.data.sales);
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
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="flex ">
      <div className="">
        <Navbar />
      </div>
      <div className="w-full pl:2 md:pl-64 ">
        <Header />
        <div className="p-10 w-full">
          <h2 className="text-2xl text-[#0B245B] font-bold mb-5">
            Transactions
          </h2>
          <div>
            {isLoading ? (
              <div className="mt-[20px]">
                <ClipLoader />
              </div>
            ) : sales.length > 0 ? (
              <>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow className="bg-[80FAFA_1￼]">
                        <TableCell>Date</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sales.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell>{formatDate(sale.created_at)}</TableCell>
                          <TableCell>{sale.customer_name}</TableCell>
                          <TableCell>{sale.phone_number}</TableCell>
                          <TableCell>Completed</TableCell>
                          <TableCell><span>&#8358;</span>{sale.total_price}</TableCell>
                          <TableCell>
                            <div className=" flex gap-4">
                              <ReceiptModal sale={sale} />
                              {/* <button onClick={handlePrintReceipt}>
                          Print Receipt
                        </button> */}
                            </div>
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
        </div>
      </div>
    </div>
  );
};

export default SaleList;
