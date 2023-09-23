import React, { useState } from "react";
import styles from "./SearchPopup.module.css";
import { useLocation } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file calender
import "react-date-range/dist/theme/default.css"; // theme css file calender
import { DateRange } from "react-date-range";
import { useDispatch } from "react-redux";
import { searchHotelApi } from "../../redux/reducers/hotelReducer";

export default function SearchPopup() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isShowModalDate, setIsShowModalDate] = useState(false);

  const [destination, setDestination] = useState(
    location.state ? location.state.city : ""
  );
  const [peopleAmount, setPeopleAmount] = useState(
    location.state ? location.state.peopleQuantity : 1
  );
  const [roomAmount, setRoomAmount] = useState(
    location.state ? location.state.roomQuantity : 1
  );

  const [dateState, setDateState] = useState([
    {
      startDate: new Date(
        location.state ? location.state.dateStart : new Date()
      ),
      endDate: new Date(location.state ? location.state.dateEnd : new Date()),
      key: "selection",
    },
  ]);

  // đóng mở modal date ranger
  const modalHandel = () => {
    setIsShowModalDate(!isShowModalDate);
  };

  // handel nút search
  const searchButtonHandle = (e) => {
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
      city: destination,
      peopleQuantity: +peopleAmount,
      roomQuantity: +roomAmount,
      dateStart,
      dateEnd,
    };

    dispatch(searchHotelApi(searchData));
  };

  return (
    <div className={styles.search_popup}>
      <h1>Search</h1>

      {/* Phần city */}
      <div className={styles.form_group}>
        <label onClick={() => setIsShowModalDate(false)}>
          Destination
          <input
            type="text"
            className={styles.form_control}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
          />
        </label>
      </div>

      {/* Phần ngày tháng */}
      <div className={`${styles.form_group} ${styles.date_picker_container}`}>
        <label>
          Check-in Date
          <input
            onClick={modalHandel}
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
        </label>

        {isShowModalDate && (
          <div className={styles.date_picker}>
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
        )}
      </div>

      {/* Phần Options người + room */}
      <div className={styles.search_popup_option}>
        <h4>Options</h4>
        {/* <div className={styles.search_popup_option_item}>
          <p>Min price per night</p>
          <input type="text" placeholder="" />
        </div> */}
        {/* <div className={styles.search_popup_option_item}>
          <p>Max price per night</p>
          <input type="text" placeholder="" />
        </div> */}
        <div className={styles.search_popup_option_item}>
          <p>People</p>
          <input
            type="number"
            min="1"
            value={peopleAmount}
            onChange={(e) => setPeopleAmount(e.target.value)}
            placeholder=""
          />
        </div>
        {/* <div className={styles.search_popup_option_item}>
          <p>Children</p>
          <input type="text" placeholder="" />
        </div> */}
        <div className={styles.search_popup_option_item}>
          <p>Rooms</p>
          <input
            type="number"
            min="1"
            value={roomAmount}
            onChange={(e) => setRoomAmount(e.target.value)}
            placeholder=""
          />
        </div>
      </div>

      {/* Phần nút bấm */}
      <button onClick={searchButtonHandle} className={styles.search_popup_btn}>
        Search
      </button>
    </div>
  );
}
