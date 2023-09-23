import React, { useState } from "react";
import axios from "axios";
import styles from "./OrderPage.module.css";
import "react-date-range/dist/styles.css"; // main style file calender
import "react-date-range/dist/theme/default.css"; // theme css file calender
import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
let total = 0;

export default function OrderPage(props) {
  const { dateEnd, dateStart, today, tomorrow } = props.searchOption;
  const { userLogin } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  // Các state form thông tin người order
  const [userName, setUserName] = useState(userLogin.userName || "");
  const [email, setEmail] = useState(userLogin.email || "");
  const [phoneNumber, setPhoneNumber] = useState(userLogin.phoneNumber || "");
  const [idNumber, setIdNumber] = useState("");

  // state date option
  const [dateState, setDateState] = useState([
    {
      startDate: dateStart || today,
      endDate: dateEnd || tomorrow,
      key: "selection",
    },
  ]);

  // state select room number
  const [roomChecked, setRoomChecked] = useState({});

  // state tính tổng tiền
  const [totalBill, setTotalBill] = useState(0);

  // state payments method
  const [payments, setPayments] = useState("");

  // Hàm xử lý khi check vào checkbox room
  const checkboxHandle = (e, price) => {
    // lấy ra tên và trạng thái check của ô checkbox
    const { name, checked } = e.target;

    // Xử lý số ngày ở
    const date1 = new Date(dateState[0].startDate);
    const date2 = new Date(dateState[0].endDate);

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // kiểm tra nếu nút nào dc check thì cộng, bỏ check thì trừ giá trị
    if (checked) {
      total = total + price * diffDays;
    } else {
      total = total - price * diffDays;
    }

    setRoomChecked((prevSta) => {
      return {
        ...prevSta,
        [name]: checked,
      };
    });

    setTotalBill(total);
  };

  // Hàm render các loại room và room number
  const renderRoom = () => {
    return props.hotelData.rooms.map((hotel) => {
      return (
        <div key={hotel._id} className={styles.order_page_room_item}>
          {/* Phần thông tin cơ bản phòng price , maxPeople,... */}
          <div className={styles.room_item_info}>
            <h3>{hotel.title}</h3>
            <p className={styles.room_item_info_desc}>{hotel.desc}</p>
            <p className={styles.room_item_info_quantity}>
              Max people: <strong>{hotel.maxPeople}</strong>
            </p>
            <p className={styles.room_item_info_price}>${hotel.price}</p>
          </div>

          {/* Phần thông tin cơ bản phòng price , maxPeople,... */}
          <div className={styles.room_item_room_numbers}>
            {hotel.roomNumbers.length === 0 ? (
              <p>No room available!</p>
            ) : (
              hotel.roomNumbers.map((room) => {
                return (
                  <label key={room}>
                    <input
                      type="checkbox"
                      name={room}
                      checked={roomChecked[room] || false}
                      onChange={(e) => checkboxHandle(e, hotel.price)}
                    />
                    {room}
                  </label>
                );
              })
            )}
          </div>
        </div>
      );
    });
  };

  // Hàm xử lý nút reverse để gủi form
  const reserveButtonHandle = async () => {
    // Lọc ra những phòng có đã chọn
    let roomNumbersArr = [];
    for (const key in roomChecked) {
      const keyValue = new Number(key);
      if (roomChecked[key] == true) {
        roomNumbersArr.push(keyValue);
      }
    }

    // Kiểm tra các trường
    if (!userLogin.id) {
      alert("Vui lòng đăng nhập trước khi book phòng!");
      return navigate("../login", { replace: true });
    } else if (!userName || !email || !phoneNumber || !idNumber) {
      return alert("Vui lòng nhập đầy đủ thông tin người đặt!");
    } else if (!payments) {
      return alert("Vui lòng chọn phương thức thanh toán!");
    } else if (roomNumbersArr.length == 0) {
      return alert("Vui lòng chọn phòng!");
    }

    const dataTransaction = {
      userId: userLogin.id || "",
      userName: userName,
      hotel: props.hotelData._id,
      room: roomNumbersArr,
      dateStart: dateState[0].startDate,
      dateEnd: dateState[0].endDate,
      price: total,
      payment: payments,
      status: "Booked",
    };

    // Gọi API để tạo tranansaction
    const apiTransaction = await axios({
      url: `http://localhost:5000/api/transaction`,
      method: "POST",
      data: dataTransaction,
    });
    if (!apiTransaction.data.status) {
      return alert(apiTransaction.data.message);
    }
    alert(apiTransaction.data.message);
    return navigate("../");
  };

  return (
    <div id={styles.order_page}>
      {/* Phần option time + form thông tin*/}
      <div className={styles.order_page_option}>
        {/* Phần date picker */}
        <div className={styles.date_picker}>
          <h1>Date</h1>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            className="date"
            minDate={new Date()}
            onChange={(item) => {
              if (item.selection.startDate != item.selection.endDate) {
                props.fecthAPIHotelDetail(
                  item.selection.startDate,
                  item.selection.endDate
                );
              }
              setDateState([item.selection]);
            }}
            ranges={dateState}
          />
        </div>

        {/* Phần form thông tin */}
        <form className={styles.order_page_option_form}>
          <h1>Reserve Info</h1>
          <div className={styles.form_group}>
            <label>
              Your Full Name:
              <input
                type="text"
                className={styles.form_control}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User name"
              />
            </label>
          </div>

          <div className={styles.form_group}>
            <label>
              Your Email:
              <input
                type="text"
                className={styles.form_control}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </label>
          </div>

          <div className={styles.form_group}>
            <label>
              Your Phone Numer:
              <input
                type="text"
                className={styles.form_control}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Numer"
              />
            </label>
          </div>
          <div className={styles.form_group}>
            <label>
              Your ID Number:
              <input
                type="text"
                className={styles.form_control}
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Your ID Number"
              />
            </label>
          </div>
        </form>
      </div>

      {/* Phần thông tin các room còn trống - done */}
      <div className={styles.order_page_room}>
        <h1>Select Rooms</h1>
        <div className={styles.order_page_room_container}>{renderRoom()}</div>
      </div>

      {/* Phần bill + payments */}
      <div className={styles.order_page_payments}>
        <h1>Total Bill: ${totalBill}</h1>
        <div className={styles.order_page_payments_method}>
          <select
            name="payments"
            onChange={(e) => {
              setPayments(e.target.value);
            }}
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>

          <button onClick={reserveButtonHandle} type="submit">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}
