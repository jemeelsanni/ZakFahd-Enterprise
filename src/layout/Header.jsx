import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import TocIcon from "@mui/icons-material/Toc";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddCommentIcon from "@mui/icons-material/AddComment";
import profile from "../assets/images/profile.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from '@mui/icons-material/Logout';


const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/dashboard";
  const [open, setOpen] = useState(false);
  return (
    <header className="relative">
      {open && (
        <>
          <div className="absolute h-screen w-3/4 ">
            <div className="fixed w-3/4 h-screen text-white  bg-[#0B245B] p-6">
              <div className="flex flex-row justify-between">
                <p className="text-lg font-semibold">ZakFahd Enterprise</p>
                <div onClick={() => setOpen(false)}>
                  <CloseIcon />
                </div>
              </div>
              <div className="mt-6">
                <ol className="flex flex-col gap-3">
                  <li
                    className={`mr-3 p-2 rounded-lg ${
                      isHomePage
                        ? "bg-blue-200 text-base font-semibold text-blue-900"
                        : ""
                    }`}
                  >
                    <Link
                      to="/dashboard"
                      className="flex gap-3 text-base font-semibold items-center"
                    >
                      <DashboardIcon /> Dashboard
                    </Link>
                  </li>
                  <li
                    className={`mr-3 p-2 rounded-lg ${
                      location.pathname === "/addproduct"
                        ? "bg-blue-200 text-base font-semibold text-blue-900"
                        : ""
                    }`}
                  >
                    <Link
                      to="/addproduct"
                      className="flex gap-3 text-base font-semibold items-center"
                    >
                      <AddToPhotosIcon /> Add Product
                    </Link>
                  </li>
                  <li
                    className={`mr-3 p-2 rounded-lg ${
                      location.pathname === "/productlist"
                        ? "bg-blue-200 text-base font-semibold text-blue-900"
                        : ""
                    }`}
                  >
                    <Link
                      to="/productlist"
                      className="flex gap-3 text-base font-semibold items-center"
                    >
                      <TocIcon /> Product List
                    </Link>
                  </li>
                  <li
                    className={`mr-3 p-2 rounded-lg ${
                      location.pathname === "/sale"
                        ? "bg-blue-200 text-base font-semibold text-blue-900"
                        : ""
                    }`}
                  >
                    <Link
                      to="/sale"
                      className="flex gap-3 text-base font-semibold items-center"
                    >
                      <AddCommentIcon /> New Sale
                    </Link>
                  </li>
                  <li
                    className={`mr-3 p-2 rounded-lg ${
                      location.pathname === "/transactions"
                        ? "bg-blue-200 text-base font-semibold text-blue-900"
                        : ""
                    }`}
                  >
                    <Link
                      to="/transactions"
                      className="flex gap-3 text-base font-semibold items-center"
                    >
                      <ReceiptIcon /> Transactions
                    </Link>
                  </li>
                </ol>
                <button className=' absolute bottom-16 flex gap-3 text-base font-semibold items-center'><Link to="/" className="flex gap-3"> <LogoutIcon/>Logout</Link> </button>

              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-between w-full bg-[#0B245B] text-white px-8 py-2 items-center">
        <div onClick={() => setOpen(!open)} className="md:hidden">
          <MenuIcon />
        </div>
        <h3 className=" text-2xl font-semibold hidden md:block">
          ZakFahd Enterprises
        </h3>
        <div className="flex flex-row items-center  gap-4">
          <img
            className=" rounded-full h-8 md:h-12 w-8 md:w-12"
            src={profile}
            alt=""
          />
          <div className=" text-center">
            <p>Zakari Fahd</p>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
