import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import TocIcon from '@mui/icons-material/Toc';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCommentIcon from '@mui/icons-material/AddComment';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/dashboard"; // Check if the current page is the home page

  return (
    // <Sidebar
    //   className="pl-5 py-10 h-full fixed text-white nav "
    //   style={{ position: "fixed" }}
    // >
    //   <Menu className="nav h-full">
    //     <MenuItem
    //       icon={<MenuOutlinedIcon />}
    //       onClick={() => {
    //         collapseSidebar();
    //       }}
    //     >
    //       {" "}
    //       <h2 className="mb-10 mt-10 text-sm">ZakFahd</h2>
    //     </MenuItem>

    //     <MenuItem icon={<HomeOutlinedIcon />}>
    //       <Link to="/dashboard" className="flex gap-3 items-center">
    //         {" "}
    //         Dashboard
    //       </Link>
    //     </MenuItem>
    //     <SubMenu label="Product" icon={<PeopleOutlinedIcon />}>
    //       <MenuItem className="nav" icon={<PeopleOutlinedIcon />}>
    //         <Link to="/addproduct" className="flex gap-3 items-center">
    //           {" "}
    //           Add Product
    //         </Link>
    //       </MenuItem>
    //       <MenuItem className="nav" icon={<PeopleOutlinedIcon />}>
    //         <Link to="/productlist" className="flex gap-3 items-center">
    //           {" "}
    //           Products List
    //         </Link>
    //       </MenuItem>
    //       <MenuItem className="nav" icon={<PeopleOutlinedIcon />}>
    //         <Link to="/brand" className="flex gap-3 items-center">
    //           {" "}
    //           Brand{" "}
    //         </Link>
    //       </MenuItem>
    //       <MenuItem className="nav" icon={<PeopleOutlinedIcon />}>
    //         <Link to="/producttype" className="flex gap-3 items-center">
    //           {" "}
    //           Product Type
    //         </Link>
    //       </MenuItem>
    //     </SubMenu>

    //     <MenuItem icon={<ReceiptOutlinedIcon />}>
    //       <Link to="/sale" className="flex gap-3 items-center">
    //         {" "}
    //         New Sale
    //       </Link>
    //     </MenuItem>
    //     <MenuItem icon={<ContactsOutlinedIcon />}>
    //       <Link to="/transactions" className="flex gap-3 items-center">
    //         {" "}
    //         Transactions
    //       </Link>
    //     </MenuItem>
    //   </Menu>
    // </Sidebar>

    <div className='fixed md:block hidden'>
      <div className="pl-5 w-64 border-r-2 py-10 relative h-screen text-white bg-[#0B245B]">
        <div className='mb-10 text-sm'>Welcome, <br /> <span className='font-semibold'>Admin</span></div>
        <div>
          <ol className='flex flex-col gap-3'>
            <li className={`mr-3 p-2 rounded-lg ${isHomePage ? 'bg-blue-200 text-base font-semibold text-blue-900' : ''}`}>
              <Link to="/dashboard" className='flex gap-3 text-base font-semibold items-center'><DashboardIcon/> Dashboard</Link>
            </li>
            <li className={`mr-3 p-2 rounded-lg ${location.pathname === '/addproduct' ? 'bg-blue-200 text-base font-semibold text-blue-900' : ''}`}>
              <Link to="/addproduct" className='flex gap-3 text-base font-semibold items-center'><AddToPhotosIcon/>  Add Product</Link>
            </li>
            <li className={`mr-3 p-2 rounded-lg ${location.pathname === '/productlist' ? 'bg-blue-200 text-base font-semibold text-blue-900' : ''}`}>
              <Link to="/productlist" className='flex gap-3 text-base font-semibold items-center'><TocIcon/> Product List</Link>
            </li>
            <li className={`mr-3 p-2 rounded-lg ${location.pathname === '/sale' ? 'bg-blue-200 text-base font-semibold text-blue-900' : ''}`}>
              <Link to="/sale" className='flex gap-3 text-base font-semibold items-center' ><AddCommentIcon/> New Sale</Link>
            </li>
            <li className={`mr-3 p-2 rounded-lg ${location.pathname === '/transactions' ? 'bg-blue-200 text-base font-semibold text-blue-900' : ''}`}>
              <Link to="/transactions" className='flex gap-3 text-base font-semibold items-center'><ReceiptIcon/> Transactions</Link>
            </li>
          </ol>
          <button className=' absolute bottom-16 flex gap-3 text-base font-semibold items-center'><Link to="/" className="flex gap-3"> <LogoutIcon/>Logout</Link> </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
