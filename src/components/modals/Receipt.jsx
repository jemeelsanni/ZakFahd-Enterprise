/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Cookie from "js-cookie";
import axios from "axios";
import { ClipLoader } from "react-spinners";
// eslint-disable-next-line react/prop-types
export default function ReceiptModal({ sale }) {
  let [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saleById, setSaleById] = useState({});
  const [items, setItems] = useState([]);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function printReceipt() {
    window.print();
  }

  // Function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const getSaleById = async () => {
    setIsLoading(true);
    const token = Cookie.get("accessToken");
    try {
      const response = await axios.get(
        // eslint-disable-next-line no-undef
        `${process.env.ENV_BACKEND_URL}/api/v1/sale/${sale.slug}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaleById(response.data.data.sale);
      setItems(response.data.data.items);
      openModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(items);
  return (
    <>
      <button onClick={getSaleById}>
        {!isLoading ? <ReceiptLongIcon /> : <ClipLoader size={16} />}
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* ... other Transition.Child components */}
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
              {/* ... other Transition.Child components */}
              <Dialog.Panel className=" printable w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle  transition-all">
                <div className="w-full align-middle">
                  <h1 className="text-xl font-bold text-center mb-1">
                    ZakFahd Enterprise
                  </h1>
                  <h1 className="text-lg font-semibold text-center mb-4">
                    Customer Invoice
                  </h1>
                  <div className="mb-4">
                    <p className="text-sm">
                      <strong>Customer Name:</strong> {saleById.customer_name}
                    </p>
                    <p className="text-sm">
                      <strong>Phone Number:</strong> {saleById.phone_number}
                    </p>
                    <p className="text-sm">
                      <strong>Payment Mode:</strong> {saleById.payment_mode}
                    </p>
                    <p className="text-sm">
                      <strong>Date:</strong> {formatDate(saleById.created_at)}
                    </p>
                  </div>

                  {/* Placeholder for items */}
                  <div className="text-sm mb-4 gap-y-[30px]">
                    {items.map((item, index) => {
                      return (
                        <div key={index} className="flex flex-col ">
                          <h1 className="text-[18px] font-semibold">{item.name}</h1>
                          <div className="]">
                            <p className="text-sm">
                              <strong>Chasis Number:</strong>{" "}
                              {item.chassis_number}
                            </p>
                            <p className="text-sm">
                              <strong>Model Number:</strong> {item.model_number}
                            </p>
                            <p className="text-sm">
                              <strong>Engine Number:</strong>{" "}
                              {item.engine_number}
                            </p>
                            <p className="text-sm">
                              <strong>Color:</strong> {item.color}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    {/* Dynamically list items here */}
                  </div>

                  {/* Total amount */}
                  <div className="text-sm font-semibold">
                    <p>
                      <strong>Total:</strong> <span>&#8358;</span>{sale.total_price}
                    </p>
                  </div>

                  {/* Footer information */}
                  <div className="text-center text-xs text-gray-600 mt-4">
                    <p>Thank you for your purchase!</p>
                    <p>Zakfahd Enterprise</p>
                    <p>Gbasoro Road, Gbesare, beside Islamiya Primary School, Kaiama, Kwara State.</p>
                  </div>

                  <button
                    type="button"
                    className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={printReceipt}
                  >
                    Print Receipt
                  </button>
                </div>
              </Dialog.Panel>
              {/* ... other Transition.Child components */}
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
