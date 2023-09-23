import React, { useState } from "react";
import styles from "./Navbar.module.css";
import navData from "../../data/navBar.json";
import NavbarItem from "./NavbarItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../redux/reducers/authReducer";
import { getTransactionApiActionThunk } from "../../redux/reducers/transactionReducer";

export default function Navbar(props) {
  const [navbarList, setNavbarList] = useState(navData);
  const { isLogin, userLogin } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hàm thay đổi khi click vào icon khác của navbar
  const changeNavItemHandle = (itemType) => {
    const newNavbarList = [...navbarList];
    const index = newNavbarList.findIndex((item) => {
      return item.active === true;
    });
    newNavbarList[index].active = false;
    const newIndex = newNavbarList.findIndex((item) => {
      return item.type === itemType;
    });
    newNavbarList[newIndex].active = true;

    setNavbarList(newNavbarList);
  };

  // Hàm render Navbar Item
  const renderNavbarList = () => {
    return navbarList.map((item, index) => {
      return (
        <NavbarItem
          key={index}
          itemInfo={item}
          changeNavItemHandle={changeNavItemHandle}
        />
      );
    });
  };

  return (
    <div id={styles.navbar}>
      {/* Navbar content */}
      <div className={styles.navbar_content}>
        <h3 onClick={() => navigate("/")}>Booking Website</h3>

        {isLogin ? (
          <div className={styles.navbar_content_btn}>
            <p>Hello, {userLogin.email}</p>
            <button
              onClick={() => {
                navigate("/transaction");
              }}
            >
              Transaction
            </button>
            <button onClick={() => dispatch(onLogout())}>Log out</button>
          </div>
        ) : (
          <div className={styles.navbar_content_btn}>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        )}
      </div>

      {/* Navbar list items */}
      <nav className={styles.navbar_list}>
        <ul>{renderNavbarList()}</ul>
      </nav>
    </div>
  );
}
