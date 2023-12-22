// UpdateSaleModal.js
import React, { useState } from "react";

const UpdateSaleModal = ({ isOpen, onClose, sale, onUpdateSale }) => {
  const [updatedSale, setUpdatedSale] = useState({
    chassisNumber: sale?.chassisNumber || "",
    modelNumber: sale?.modelNumber || "",
    engineNumber: sale?.engineNumber || "",
    color: sale?.color || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSale((prevSale) => ({
      ...prevSale,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdateSale({ ...sale, ...updatedSale });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    // Prevent clicks inside the modal from closing it
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <div className="modal" onClick={onClose}>
          <div className="modal-overlay"></div>
          <div className="modal-container w-[55%]" onClick={handleModalClick}>
            <div className="modal-content flex flex-col gap-4 w-full">
              <h3 className="text-2xl font-bold mb-5">Update Sale</h3>
              <label className="flex flex-col">
                Chassis Number:
                <input
                  type="text"
                  name="chassisNumber"
                  value={updatedSale.chassisNumber}
                  onChange={handleInputChange}
                  className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                />
              </label>
              <label className="flex flex-col">
                Model Number:
                <input
                  type="text"
                  name="modelNumber"
                  value={updatedSale.modelNumber}
                  onChange={handleInputChange}
                  className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                />
              </label>

              <label className="flex flex-col">
                Engine Number:
                <input
                  type="text"
                  name="engineNumber"
                  value={updatedSale.engineNumber}
                  onChange={handleInputChange}
                  className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                />
              </label>
              <label className="flex flex-col">
                Color:
                <input
                  type="text"
                  name="color"
                  value={updatedSale.color}
                  onChange={handleInputChange}
                  className="outline-none border-[#0B245B6B] border-[1px] bg-[#7198EF30] p-2"
                />
              </label>
              {/* Add other fields */}
              <button
                onClick={handleSave}
                className="outline-none border-[#0B245B6B] border-[1px] bg-[#0B245B6B] p-2"
              >
                Save
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateSaleModal;