import React, { useState, useEffect } from "react";
import Receipt from "./Receipt";
import Navbar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SaleList = () => {
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
    <div className="flex ">
      <div className="">
        <Navbar />
      </div>
      <div className="w-full pl-64 ">
        <Header />
        <div className="p-10 w-full">
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
                        <button onClick={() => handleViewReceipt(sale)}>
                          View Receipt
                        </button>
                        <button onClick={handlePrintReceipt}>
                          Print Receipt
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedSale && (
            <Receipt sale={selectedSale} onClose={() => setSelectedSale(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SaleList;
