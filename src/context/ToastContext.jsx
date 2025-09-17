import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const triggerToast = (message,type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast, triggerToast, toastMessage, toastType }}>
      {children}
      {showToast && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toastMessage}
        </div>
      )}
    </ToastContext.Provider>
  );
};