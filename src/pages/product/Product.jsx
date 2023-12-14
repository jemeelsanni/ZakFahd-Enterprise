import React from "react";
import AddProductForm from "./AddProduct"; // Corrected import statement
import ProductList from "./ProductList";

const Product = () => {
  const initialProducts = []; // Add your initial product data here

  const [products, setProducts] = React.useState(initialProducts);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <AddProductForm onAddProduct={addProduct} />
      <ProductList products={products} />
    </div>
  );
};

export default Product;
