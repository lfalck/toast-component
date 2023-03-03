import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, variant, handleDismiss, children }) {
  if (!ICONS_BY_VARIANT.hasOwnProperty(variant)) {
    throw new Error(
      `Unrecognized variant ${variant}, legal variants are: ${Object.keys(
        ICONS_BY_VARIANT
      )}`
    );
  }

  const Tag = ICONS_BY_VARIANT[variant];

  return (
    <li className={styles.toastWrapper}>
      <div className={`${styles.toast} ${styles[variant]}`}>
        <div className={styles.iconContainer}>
          <Tag size={24} />
        </div>
        <p className={styles.content}>{children} </p>
        <button
          className={styles.closeButton}
          onClick={() => handleDismiss(id)}
        >
          <X size={24} />
          <VisuallyHidden>Dismiss message</VisuallyHidden>
        </button>
      </div>
    </li>
  );
}

export default Toast;
