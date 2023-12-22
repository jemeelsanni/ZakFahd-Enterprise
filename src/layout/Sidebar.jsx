import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Navbar = () => {
  const { collapseSidebar } = useProSidebar();
  const location = useLocation();
  const isHomePage = location.pathname === "/Index"; // Check if the current page is the home page

  return (
    <Sidebar className="pl-5 py-10 h-full fixed text-white nav " style={{ position: "fixed" }}>
      <Menu className="nav h-full">
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
        >
          {" "}
          <h2 className="mb-10 mt-10 text-sm">ZakFahd</h2>
        </MenuItem>

        <MenuItem icon={<HomeOutlinedIcon />}>
          <Link to="/Index" className="flex gap-3 items-center">
            {" "}
            Dashboard
          </Link>
        </MenuItem>
        <SubMenu label="Product" icon={<PeopleOutlinedIcon />}>
          <MenuItem className="nav" icon={<PeopleOutlinedIcon />}>
            <Link to="/addproduct" className="flex gap-3 items-center">
            {" "}
            Add Product
          </Link>
          </MenuItem>
          <MenuItem className="nav" icon={<PeopleOutlinedIcon />}>
            <Link to="/productlist" className="flex gap-3 items-center">
            {" "}
            Products List
          </Link>
          </MenuItem>
          <MenuItem className="nav" icon={<PeopleOutlinedIcon />}>
            
            <Link to="/brand" className="flex gap-3 items-center">
            {" "}
            Brand          </Link>
          </MenuItem>
          <MenuItem className="nav" icon={<PeopleOutlinedIcon />}>
            <Link to="/producttype" className="flex gap-3 items-center">
            {" "}
            Product Type
          </Link>
          </MenuItem>
        </SubMenu>

        <MenuItem icon={<ReceiptOutlinedIcon />}>
          <Link to="/sale" className="flex gap-3 items-center">
            {" "}
            New Sale
          </Link>
        </MenuItem>
        <MenuItem icon={<ContactsOutlinedIcon />}>
          <Link to="/transactions" className="flex gap-3 items-center">
            {" "}
            Transactions
          </Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Navbar;
