import { Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import AddProductForm from "./pages/product/AddProduct";
import ProductList from "./pages/product/ProductList";
import Product from "./pages/product/Product";
import Sale from "./pages/sale/Sale";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/addproduct" element={<AddProductForm />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/product" element={<Product />} />
      <Route path="/sale" element={<Sale />} />


    </Routes>
  );
}

export default App;
