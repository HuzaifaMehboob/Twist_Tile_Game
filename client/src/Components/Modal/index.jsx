// Modal.js
import React from "react";
import "./Modal.css"; // Optional: Add CSS for styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.model-overlay}>
      <div className={classe.modal-content}>
        <button className={classes.close-button} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
