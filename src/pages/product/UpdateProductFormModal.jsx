import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import UpdateProductForm from "./UpdateProductForm";

Modal.setAppElement("#root"); // Set the root element for the modal

const UpdateProductFormModal = ({ productId, isOpen, onRequestClose, onUpdateProduct }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Product Form"
    >
      <UpdateProductForm productId={productId} onUpdateProduct={onUpdateProduct} />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default UpdateProductFormModal;
