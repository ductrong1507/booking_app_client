import React, { useRef } from "react";
import styles from "./AuthPage.module.css";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(props) {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();

  // xử lý sign up
  const registerHandel = async (e) => {
    e.preventDefault();

    // kiểm tra nhập đủ các trường
    if (
      !userNameRef.current.value.trim() ||
      !passwordRef.current.value.trim() ||
      !phoneNumberRef.current.value.trim() ||
      !emailRef.current.value.trim()
    ) {
      alert("Vui lòng nhập đủ các trường!");
      return;
    }

    try {
      const resultAPI = await axios({
        method: "POST",
        url: `${API_BASE_URL}/api/user`,
        data: {
          userName: userNameRef.current.value.trim().toLowerCase(),
          password: passwordRef.current.value.trim().toLowerCase(),
          phoneNumber: phoneNumberRef.current.value.trim().toLowerCase(),
          email: emailRef.current.value.trim().toLowerCase(),
        },
      });

      // xử lý trùng user
      if (resultAPI.data.status === false) {
        alert(resultAPI.data.message);
        return;
      }

      alert(resultAPI.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id={styles.auth_page}>
      <h1>Sign Up</h1>
      <form onSubmit={registerHandel}>
        <div className={styles.form_group}>
          <input
            className={styles.form_control}
            type="text"
            name="userName"
            ref={userNameRef}
            placeholder="Your username"
          />
        </div>

        <div className={styles.form_group}>
          <input
            className={styles.form_control}
            type="text"
            name="password"
            ref={passwordRef}
            placeholder="Your password"
          />
        </div>

        <div className={styles.form_group}>
          <input
            className={styles.form_control}
            type="text"
            name="phoneNumber"
            ref={phoneNumberRef}
            placeholder="Your phone number"
          />
        </div>

        <div className={styles.form_group}>
          <input
            className={styles.form_control}
            type="text"
            name="email"
            ref={emailRef}
            placeholder="Your email"
          />
        </div>

        <button type="submit" className={styles.btn}>
          Sign Up
        </button>
      </form>
    </section>
  );
}
