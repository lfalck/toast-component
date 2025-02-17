import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider";

function ToastShelf({ handleDismiss }) {
  const { toastCollection } = React.useContext(ToastContext);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      ariaLive="assertive"
      ariaLabel="Notification"
    >
      {toastCollection.map((toast) => {
        return (
          <li key={toast.id} className={styles.toastWrapper}>
            <Toast
              id={toast.id}
              variant={toast.variant}
              handleDismiss={handleDismiss}
            >
              {toast.message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
