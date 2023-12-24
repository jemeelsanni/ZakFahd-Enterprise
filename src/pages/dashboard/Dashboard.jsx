import { useEffect, useState } from "react";
import DoughnutChart from "../../components/charts/DougnutChart";
import LineChart from "../../components/charts/LineChart";
import Header from "../../layout/Header";
import Navbar from "../../layout/Sidebar";
import SaleList from "../sale/SaleList";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Receipt from "../sale/Receipt";
import ReceiptModal from "../../components/modals/Receipt";
const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    const mockSalesData = [
      {
        id: 1,
        date: "2023-01-01",
        customerName: "John Doe",
        phoneNumber: "09068922344",
        status: "completed",
        total: 100,
        products: [
          { name: "Product A", price: 50, quantity: 2 },
          { name: "Product B", price: 25, quantity: 1 },
        ],
      },
      {
        id: 1,
        date: "2023-01-01",
        customerName: "John Doe",
        phoneNumber: "09068922344",
        status: "completed",
        total: 100,
        products: [
          { name: "Product A", price: 50, quantity: 2 },
          { name: "Product B", price: 25, quantity: 1 },
        ],
      },
      {
        id: 1,
        date: "2023-01-01",
        customerName: "John Doe",
        phoneNumber: "09068922344",
        status: "completed",
        total: 100,
        products: [
          { name: "Product A", price: 50, quantity: 2 },
          { name: "Product B", price: 25, quantity: 1 },
        ],
      },
      {
        id: 1,
        date: "2023-01-01",
        customerName: "John Doe",
        phoneNumber: "09068922344",
        status: "completed",
        total: 100,
        products: [
          { name: "Product A", price: 50, quantity: 2 },
          { name: "Product B", price: 25, quantity: 1 },
        ],
      },
    ];

    setSales(mockSalesData);
  }, []);

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
      <div className=" w-full pl-64">
        <Header />
        <div className="w-full bg-gray-200 py-[15px] ">
          <div className="flex mt-[20px] flex-col gap-y-[30px]">
            <div className="w-full max-w-[95%] mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[14px]">
              <div className="p-[24px] bg-white flex items-center w-[] h-[126px] justify-between">
                <div className="p-[20px] bg-gray-200 rounded-full"></div>
                <div className="flex flex-col gap-y-[8px]">
                  <h4>Accessed Profits</h4>
                  <p className="text-[20px] font-bold ">20394</p>
                </div>
              </div>
              <div className="p-[24px] bg-white flex items-center w-[] h-[126px] justify-between">
                <div className="p-[20px] bg-gray-200 rounded-full"></div>
                <div className="flex flex-col gap-y-[8px]">
                  <h4>Accessed Profits</h4>
                  <p className="text-[20px] font-bold ">20394</p>
                </div>
              </div>
              <div className="p-[24px] bg-white flex items-center w-[] h-[126px] justify-between">
                <div className="p-[20px] bg-gray-200 rounded-full"></div>
                <div className="flex flex-col gap-y-[8px]">
                  <h4>Accessed Profits</h4>
                  <p className="text-[20px] font-bold ">20394</p>
                </div>
              </div>
              <div className="p-[24px] bg-white flex items-center w-[] h-[126px] justify-between">
                <div className="p-[20px] bg-gray-200 rounded-full"></div>
                <div className="flex flex-col gap-y-[8px]">
                  <h4>Accessed Profits</h4>
                  <p className="text-[20px] font-bold ">20394</p>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[95%] mx-auto lg:h-[400px] items-center flex lg:flex-row flex-col justify-between  gap-[20px]">
              <LineChart />
              <div className="lg:w-[25%] w-full py-[15px] flex justify-center rounded-[8px] bg-white">
                <DoughnutChart />
              </div>
            </div>
            <div className="w-full max-w-[95%]  mx-auto">
              <div className=" w-full">
                <h2 className="text-2xl font-bold mb-5">Sale List</h2>
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
                          <TableCell>{sale.date}</TableCell>
                          <TableCell>{sale.customerName}</TableCell>
                          <TableCell>{sale.phoneNumber}</TableCell>
                          <TableCell>Completed</TableCell>
                          <TableCell>{sale.total}</TableCell>
                          <TableCell>
                            <div className=" flex gap-4">
                              <ReceiptModal />
                              <button onClick={() => handleViewReceipt(sale)}>
                                Print Receipt
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
