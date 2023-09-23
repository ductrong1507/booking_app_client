import React, { useRef } from "react";
import styles from "./AuthPage.module.css";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLogin } from "../../redux/reducers/authReducer";

export default function LoginPage(props) {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // xử lý login
  const loginHandel = async (e) => {
    e.preventDefault();

    // kiểm tra nhập đủ các trường
    if (
      !userNameRef.current.value.trim() ||
      !passwordRef.current.value.trim()
    ) {
      alert("Vui lòng nhập đủ các trường!");
      return;
    }

    try {
      const resultAPI = await axios({
        url: `${API_BASE_URL}/api/user/login`,
        method: "POST",
        data: {
          userName: userNameRef.current.value.trim().toLowerCase(),
          password: passwordRef.current.value.trim().toLowerCase(),
        },
      });

      alert(resultAPI.data.message);

      // CHuyển hướng và call reducer
      if (resultAPI.data.status) {
        dispatch(onLogin(resultAPI.data));
        navigate(-1, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id={styles.auth_page}>
      <h1>Login</h1>
      <form onSubmit={loginHandel}>
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
        <button type="submit" className={styles.btn}>
          Login
        </button>
      </form>
    </section>
  );
}
