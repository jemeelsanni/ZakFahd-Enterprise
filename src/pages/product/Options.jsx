import React, { useState } from "react";
import BrandOptions from "./BrandOptions";
import ProductTypeOptions from "./ProductTypeOptions";

const Options = () => {
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const addBrand = (newBrand) => {
    setBrands([...brands, newBrand]);
  };

  const addProductType = (newProductType) => {
    setProductTypes([...productTypes, newProductType]);
  };

  return (
    <div>
      <BrandOptions onAddBrand={addBrand} />
      <ProductTypeOptions onAddProductType={addProductType} />

      <div>
        <h3>Brand Options</h3>
        <ul>
          {brands.map((brand, index) => (
            <li key={index}>{brand}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Product Type Options</h3>
        <ul>
          {productTypes.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Options;
