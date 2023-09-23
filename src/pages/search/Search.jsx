import React, { useEffect } from "react";
import SearchList from "../../components/SearchList/SearchList";
import SearchPopup from "../../components/SearchPopup/SearchPopup";
import FormSubscribe from "../../components/FormSubscribe/FormSubscribe";
import styles from "./Search.module.css";
import { useDispatch } from "react-redux";
import { searchHotelApi } from "../../redux/reducers/hotelReducer";
import { useLocation } from "react-router-dom";

export default function Search(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Tạo dữ liệu để call API
    const searchData = location.state || {};

    //tạo action thunk gọi hàm từ reducer, sau đó dispatch action lên
    const actionThunk = searchHotelApi(searchData);

    dispatch(actionThunk);
  }, [location.state]);

  return (
    <section id={styles.search_page}>
      <div className={styles.search_page_content}>
        <SearchPopup />
        <SearchList />
      </div>

      <div style={{ backgroundColor: "#003580" }}>
        <FormSubscribe />
      </div>
    </section>
  );
}
