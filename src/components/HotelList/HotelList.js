import React from "react";
import styles from "./HotelList.module.css";
// import hotelList from "../../data/hotel_list.json";

export default function HotelList(props) {
  // render danh sách hotel
  const renderHotelList = () => {
    return props.hoteListArea.map((type, index) => {
      return (
        <div
          key={type._id}
          onClick={() => window.open(`/detail/${type._id}`, "_blank")}
          className={styles.hotel_list_item}
        >
          <img src={type.photos[0] || "./images/new_city_img/no_image.jpg"} />
          <p className={styles.title} href="/detail" target="_blank">
            {type.name}
          </p>
          <p className={styles.hotel_list_item_city}>{type.city}</p>
          <h4 className={styles.hotel_list_item_price}>
            Starting from ${type.cheapestPrice}
          </h4>
          <p className={styles.hotel_list_item_rate}>
            <span className={styles.rate_highlight}>
              {type.rating.toFixed(1)}
            </span>
            <span>Excellent</span>
          </p>
        </div>
      );
    });
  };

  return (
    <div className={styles.hotel_list_container}>
      <h1>Homes guests love</h1>

      <div className={styles.hotel_list}>{renderHotelList()}</div>
    </div>
  );
}
