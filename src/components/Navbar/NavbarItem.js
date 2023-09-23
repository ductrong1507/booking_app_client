import React from "react";
import styles from "./Navbar.module.css";

export default function NavbarItem(props) {
  return (
    <li
      onClick={() => {
        props.changeNavItemHandle(props.itemInfo.type);
      }}
      className={props.itemInfo.active ? styles.active : ""}
    >
      <i className={`fa-solid ${props.itemInfo.icon}`} />
      {props.itemInfo.type}
    </li>
  );
}
