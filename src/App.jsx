import { Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import AddProductForm from "./pages/product/AddProduct";
import ProductList from "./pages/product/ProductList";
import Sale from "./pages/sale/Sale";
import SaleList from "./pages/sale/SaleList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/addproduct" element={<AddProductForm />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/transactions" element={<SaleList />} />



    </Routes>
  );
}

export default App;
