import React from "react";
import styles from "./Loading.module.css";

export default function Loading({ text = "LOADING..." }) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className="caption">{text}</p>
    </div>
  );
}
