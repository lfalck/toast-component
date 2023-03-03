import React from "react";

import Button from "../Button";
import Toast from "../Toast";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [variantChecked, setVariantChecked] = React.useState(
    VARIANT_OPTIONS[0]
  );
  const [message, setMessage] = React.useState("");
  const [toastCollection, setToastCollection] = React.useState([]);

  function handleDismiss(id) {
    const nextToastCollection = toastCollection.filter((toast) => {
      return toast.id !== id;
    });
    setToastCollection(nextToastCollection);
  }

  function addToast(event) {
    event.preventDefault();
    const id = crypto.randomUUID();
    const newToast = {
      id,
      variant: variantChecked,
      message,
    };
    let nextToastCollection = [...toastCollection, newToast];
    setToastCollection(nextToastCollection);
    setMessage("");
    setVariantChecked(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {toastCollection.length > 0 && (
        <ToastShelf>
          {toastCollection.map((toast) => {
            return (
              <Toast
                key={toast.id}
                variant={toast.variant}
                handleDismiss={() => handleDismiss(toast.id)}
              >
                {toast.message}
              </Toast>
            );
          })}
        </ToastShelf>
      )}
      <form
        className={styles.controlsWrapper}
        onSubmit={(event) => addToast(event)}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;
              return (
                <label key={id} htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={variantChecked === option}
                    onChange={(event) => {
                      setVariantChecked(event.target.value);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
