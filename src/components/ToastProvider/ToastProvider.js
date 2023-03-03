import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toastCollection, setToastCollection] = React.useState([]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        setToastCollection([]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function dismissToast(id) {
    const nextToastCollection = toastCollection.filter((toast) => {
      return toast.id !== id;
    });
    setToastCollection(nextToastCollection);
  }

  function addToast(variant, message) {
    const id = crypto.randomUUID();
    const newToast = {
      id,
      variant,
      message,
    };
    let nextToastCollection = [...toastCollection, newToast];
    setToastCollection(nextToastCollection);
  }

  return (
    <ToastContext.Provider value={{ toastCollection, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
