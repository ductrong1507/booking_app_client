import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchHotelApi } from "../../redux/reducers/hotelReducer";
const today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export default function Header() {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAmount, setIsShowModalAmount] = useState(false);
  const dispatch = useDispatch();

  //state ngày tháng book hotel
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  //state số lượng người + room
  const [optionsState, setOptionsState] = useState({
    people: 1,
    room: 1,
  });

  // state nơi ở
  const cityRef = useRef();

  // Xử lý ẩn hiện modal ô input date
  const changeDateHandle = () => {
    if (isShowModal) {
      setIsShowModal(false);
    } else {
      setIsShowModal(true);
    }
  };

  // Xử lý ẩn hiện modal options
  const optionModalHandle = () => {
    setIsShowModalAmount(!isShowModalAmount);
  };

  // xử lý ẩn hiện modal khi click những ô input khác
  const hideModalDate = () => {
    if (!isShowModal) return;
    setIsShowModal(false);
  };

  //XỬ lý nút tăng giảm option
  const optionHandel = (name, operation) => {
    setOptionsState((prevSta) => {
      return {
        ...prevSta,
        [name]: operation == "i" ? prevSta[name] + 1 : prevSta[name] - 1,
      };
    });
  };

  // Xử lý nút search
  const searchHandle = (e) => {
    e.preventDefault();

    // /*
    //   CHuyển đổi ngày giờ thành giờ chuẩn
    //     + dateStart: sẽ có giờ là 14h00 cùng ngày
    //     + dateEnd: sẽ có giờ là 12h00 cùng ngày
    // */
    const dateStart = new Date(dateState[0].startDate);
    dateStart.setHours(14, 0, 0);

    const dateEnd = new Date(dateState[0].endDate);
    dateEnd.setHours(12, 30, 0);

    // tạo biến để gọi API
    const searchData = {
      city: cityRef.current.value,
      peopleQuantity: optionsState.people,
      roomQuantity: optionsState.room,
      dateStart,
      dateEnd,
    };

    // dispatch action thunk dc tạo ở phần cuối file reducer
    dispatch(searchHotelApi(searchData));
    navigate("/search", { state: searchData });
  };

  return (
    <header id={styles.header}>
      {/* Phần tiêu đề + nút Log in */}
      <div className={styles.header_content}>
        <h1>A lifetime of discounts? It's Genuus.</h1>
        <p>
          Get rewarded for you travels - unlock instant savings of 10% or more
          with a free account
        </p>
        <button>Sign in / Register</button>
      </div>

      {/* Phần nhập vào thông tin tìm kiếm + nút Search */}
      <div className={styles.header_form}>
        {/* Phần place */}
        <div className={styles.form_group}>
          <i className="fa-solid fa-bed"></i>
          <input
            onClick={hideModalDate}
            ref={cityRef}
            type="text"
            className={styles.form_control}
            placeholder="Where are you going?"
          />
        </div>

        {/* Phần input date */}
        <div id={styles.form_group_date_picker} className={styles.form_group}>
          <i className="fa-solid fa-calendar-days"></i>
          <input
            onClick={changeDateHandle}
            type="text"
            onChange={() => {}}
            value={
              dateState[0].startDate.getDate() +
              "/" +
              (dateState[0].startDate.getMonth() + 1) +
              "/" +
              dateState[0].startDate.getFullYear() +
              " to " +
              dateState[0].endDate.getDate() +
              "/" +
              (dateState[0].endDate.getMonth() + 1) +
              "/" +
              dateState[0].endDate.getFullYear()
            }
            className={styles.form_control}
          />

          {/* modal date picker */}
          <div
            id={!isShowModal ? styles.hidden : ""}
            className={styles.date_picker}
          >
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              className="date"
              minDate={new Date()}
              onChange={(item) => {
                setDateState([item.selection]);
              }}
              ranges={dateState}
            />
          </div>
        </div>

        {/* Phần person input */}
        <div className={styles.form_group}>
          <i className="fa-solid fa-person"></i>
          <span onClick={optionModalHandle} className={styles.headerSearchText}>
            {/* 1 people · 2 room{" "} */}
            {`${optionsState.people} people · ${optionsState.room} ${
              optionsState.room >= 2 ? "rooms" : "room"
            }`}
          </span>

          {/* Phần modal chọn người + room */}
          {isShowModalAmount ? (
            <div className={styles.options}>
              <div className={styles.optionItem}>
                <span className={styles.optionText}>People</span>
                <div className={styles.optionCounter}>
                  <button
                    disabled={optionsState.people <= 1}
                    onClick={() => optionHandel("people", "d")}
                    className={styles.optionCounterButton}
                  >
                    -
                  </button>
                  <span className={styles.optionCounterNumber}>
                    {optionsState.people}
                  </span>
                  <button
                    onClick={() => optionHandel("people", "i")}
                    className={styles.optionCounterButton}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.optionItem}>
                <span className={styles.optionText}>Room</span>
                <div className={styles.optionCounter}>
                  <button
                    disabled={optionsState.room <= 1}
                    onClick={() => optionHandel("room", "d")}
                    className={styles.optionCounterButton}
                  >
                    -
                  </button>
                  <span className={styles.optionCounterNumber}>
                    {optionsState.room}
                  </span>
                  <button
                    onClick={() => optionHandel("room", "i")}
                    className={styles.optionCounterButton}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          onClick={searchHandle}
          type="submit"
          className={styles.header_form_btn}
        >
          Search
        </button>
      </div>
    </header>
  );
}
