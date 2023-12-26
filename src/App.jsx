/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import AddProductForm from "./pages/product/AddProduct";
import ProductList from "./pages/product/ProductList";
import Sale from "./pages/sale/Sale";
import SaleList from "./pages/sale/SaleList";
import Dashboard from "./pages/dashboard/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";
const ProtectedRoute = ({ children }) => {
  const accessToken = Cookie.get("accessToken");

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return children;
};
const LoginRoute = () => {
  const accessToken = Cookie.get("accessToken");

  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }

  return <Login />;
};

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute>
              <AddProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productlist"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sale"
          element={
            <ProtectedRoute>
              <Sale />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <SaleList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
