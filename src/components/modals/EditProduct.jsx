/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Cookie from "js-cookie";
import { ClipLoader } from "react-spinners";
// eslint-disable-next-line react/prop-types
export default function EditProductModal({ product, getAllProducts }) {
  let [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: product.name,
    productType: product.type,
    productPrice: product.price,
    stockAlert: product.quantity,
    brand: product.brand,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function printReceipt() {
    window.print();
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = Cookie.get("accessToken");
    try {
      const response = await axios.patch(
        // eslint-disable-next-line no-undef
        `${process.env.ENV_BACKEND_URL}/api/v1/product/${product.slug}`,
        {
          name: formData.productName,
          price: formData.productPrice,
          type: formData.productType,
          brand: formData.brand,
          quantity: formData.stockAlert,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      setIsOpen(false);
      getAllProducts();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button onClick={openModal}>
        <EditIcon />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="modal-content flex flex-col gap-4 w-full p-6 bg-white ">
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

                      <label className="flex flex-col">
                        Brand:
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          className=" outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                          required
                        >
                          <option>TVS</option>
                          <option>Bajaj</option>
                          <option>Haojue</option>
                          <option>Others</option>
                        </select>
                      </label>

                      <div>
                        <button
                          type="submit"
                          className="w-full text-base font-semibold inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          {!isLoading ? (
                            " Update Product"
                          ) : (
                            <ClipLoader size={16} />
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
