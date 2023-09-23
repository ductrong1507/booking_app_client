import React, { useEffect } from "react";
import styles from "./TransactionPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionApiActionThunk } from "../../redux/reducers/transactionReducer";

const statusClassMap = {
  Booked: "booked_color",
  Checkin: "checkin_color",
  Checkout: "checkout_color",
};

export default function TransactionPage() {
  const { transactionList } = useSelector((state) => state.transactionReducer);
  const { userLogin } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  console.log("test reload", transactionList);

  useEffect(() => {
    const actionThunk = getTransactionApiActionThunk(userLogin.id);
    dispatch(actionThunk);
  }, [userLogin.id]);

  //   render table transaction
  const renderTransactionList = () => {
    return transactionList.map((item, index) => {
      const start = new Date(item.dateStart).toLocaleDateString("en-GB");
      const end = new Date(item.dateEnd).toLocaleDateString("en-GB");
      const stt = index + 1;
      const statusClass = statusClassMap[item.status] || "";
      return (
        <tr key={item._id}>
          <td>{stt.toString().padStart(2, "0")}</td>
          <td>{item.hotel.name}</td>
          <td className={styles.room}>
            {item.room.map((element, index) => {
              if (index === item.room.length - 1) {
                return `${element}`;
              }
              return `${element}, `;
            })}
          </td>
          <td>
            {start}-{end}
          </td>
          <td>${item.price}</td>
          <td>{item.payment}</td>

          <td>
            <span className={styles[statusClass]}>{item.status}</span>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.table_wrap}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderTransactionList()}</tbody>
      </table>
    </div>
  );
}
