import React from "react";
import SaleForm from "./Saleform";
import SaleList from "./SaleList";

const Sale = ({ products }) => {
  const [sales, setSales] = React.useState([]);

  const addSale = (newSale) => {
    setSales([...sales, newSale]);
  };

  return (
    <div>
      <SaleForm products={products} onAddSale={addSale} />
      <SaleList sales={sales} />
    </div>
  );
};

export default Sale;
