import React from "react";
import styles from "./FormSubscribe.module.css";

export default function FormSubscribe() {
  return (
    <div className={styles.subscribe_container}>
      <h1>Save time, save money!</h1>
      <p>Sign up and we'll send the best deals to you</p>
      <div className={styles.subscribe_form}>
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}
