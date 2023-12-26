import { useEffect, useState } from "react";
import DoughnutChart from "../../components/charts/DougnutChart";
import LineChart from "../../components/charts/LineChart";
import Header from "../../layout/Header";
import Navbar from "../../layout/Sidebar";
import SaleList from "../sale/SaleList";
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
import ReceiptModal from "../../components/modals/Receipt";
import axios from "axios";
import { Pagination } from "@mui/material";
const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandAnalysis, setbrandAnalysis] = useState([]);
  const [totalProducts, settotalProducts] = useState({});
  const [totalSales, settotalSales] = useState({});
  const [monthlySaleAnalysis, setmonthlySaleAnalysis] = useState([]);
  const [totalSaleAmount, settotalSaleAmount] = useState({});
  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {
    getAllProducts();
    getDashboardAnalysis();
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
      console.log(response);
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
  const getDashboardAnalysis = async () => {
    setIsLoading2(true);
    const token = Cookie.get("accessToken");
    try {
      const response = await axios.get(
        // eslint-disable-next-line no-undef
        `${process.env.ENV_BACKEND_URL}/api/v1/sale/dashboard`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setbrandAnalysis(response.data.data.brandAnalysis);
      settotalProducts(response.data.data.totalProducts);
      settotalSales(response.data.data.totalSales);
      setmonthlySaleAnalysis(response.data.data.monthlySaleAnalysis);
      settotalSaleAmount(response.data.data.totalSaleAmount);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleViewReceipt = (sale) => {
    setSelectedSale(sale);
  };

  const handlePrintReceipt = () => {
    console.log("Printing receipt for sale:", selectedSale);
  };

  return (
    <div className="flex">
      <div>
        <Navbar />
      </div>
      <div className=" w-full pl:2 md:pl-64">
        <Header />
        {!isLoading2 ? (
          <div className="w-full bg-gray-200 py-[15px] ">
            <div className="flex mt-[20px] flex-col gap-y-[30px]">
              <div className="w-full max-w-[95%] mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[14px]">
                <div className="p-[24px] bg-white flex items-center w-[] h-[126px] justify-between">
                  <div className="p-[20px] bg-gray-200 rounded-full"></div>
                  <div className="flex flex-col gap-y-[8px]">
                    <h4>Total Products</h4>
                    <p className="text-[20px] font-bold ">
                      {totalProducts.totalnumberofproducts}
                    </p>
                  </div>
                </div>
                <div className="p-[24px] bg-white flex items-center w-[] h-[126px] justify-between">
                  <div className="p-[20px] bg-gray-200 rounded-full"></div>
                  <div className="flex flex-col gap-y-[8px]">
                    <h4>Total Sale Amount</h4>
                    <p className="text-[20px] font-bold ">
                      {totalSaleAmount.totalsalesamount}
                    </p>
                  </div>
                </div>
                <div className="p-[24px] bg-white flex items-center w-[] h-[126px] justify-between">
                  <div className="p-[20px] bg-gray-200 rounded-full"></div>
                  <div className="flex flex-col gap-y-[8px]">
                    <h4>Total Sales</h4>
                    <p className="text-[20px] font-bold ">
                      {totalSales.totalnumberofproducts}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[95%] mx-auto lg:h-[400px] items-center flex lg:flex-row flex-col justify-between  gap-[20px]">
                <LineChart />
                <div className="xl:w-[25%] lg:w-[40%] w-full py-[15px] flex justify-center rounded-[8px] bg-white">
                  <DoughnutChart brandAnalysis={brandAnalysis} />
                </div>
              </div>
              <div className="w-full max-w-[95%]  mx-auto">
                <div className=" w-full">
                  <h2 className="text-2xl font-bold mb-5">Transactions</h2>
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
                                  <TableCell>
                                    {formatDate(sale.created_at)}
                                  </TableCell>
                                  <TableCell>{sale.customer_name}</TableCell>
                                  <TableCell>{sale.phone_number}</TableCell>
                                  <TableCell>Completed</TableCell>
                                  <TableCell>NGN {sale.total_price}</TableCell>
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
          </div>
        ) : (
          <ClipLoader />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
