import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProductFormModal = ({
  isOpen,
  onRequestClose,
  productId,
  onUpdateProduct,
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    productPrice: "",
    stockAlert: "",
    brand: "",
  });

  const [brandOptions, setBrandOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/${productId}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error("Error fetching product:", error));

    axios
      .get("/api/brands")
      .then((response) => setBrandOptions(response.data))
      .catch((error) => console.error("Error fetching brands:", error));

    axios
      .get("/api/productTypes")
      .then((response) => setProductTypeOptions(response.data))
      .catch((error) => console.error("Error fetching product types:", error));
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${productId}`, formData);
      onUpdateProduct(formData);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleModalClick = (e) => {
    // Prevent clicks inside the modal from closing it
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <div className="modal" onClick={onRequestClose}>
          <div className="modal-overlay"></div>
          <div className="modal-container w-[55%]" onClick={handleModalClick}>
            <div className="modal-content flex flex-col gap-4 w-full p-6 bg-white rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-5">Update Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                    className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2 w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="productType"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Product Type
                  </label>
                  <input
                    type="text"
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
                    required
                    className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2 w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="productPrice"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Product Price
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleInputChange}
                    required
                    className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2 w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="stockAlert"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Stock Alert
                  </label>
                  <input
                    type="number"
                    id="stockAlert"
                    name="stockAlert"
                    value={formData.stockAlert}
                    onChange={handleInputChange}
                    required
                    className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2 w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Brand
                  </label>
                  <select
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2 w-full"
                  >
                    <option
                      className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2 w-full"
                      value=""
                      disabled
                    >
                      Select Brand
                    </option>
                    {brandOptions.map((brand) => (
                      <option key={brand._id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full text-base font-semibold inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProductFormModal;
