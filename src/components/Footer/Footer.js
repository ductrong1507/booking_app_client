import React from "react";
import styles from "./Footer.module.css";
import footerData from "../../data/footer.json";

export default function Footer() {
  const renderFooterList = () => {
    return footerData.map((footerCol, index) => {
      return (
        <div key={footerCol.col_number} className={styles.footer_item}>
          {footerCol.col_values.map((colItem, index) => {
            return (
              <a key={index} href="/" target="_blank">
                {colItem}
              </a>
            );
          })}
        </div>
      );
    });
  };
  return <div id={styles.footer}>{renderFooterList()}</div>;
}
