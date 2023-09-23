import React from "react";
import styles from "./SearchList.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchListItem(props) {
  const navigate = useNavigate();
  const location = useLocation();

  // button see detail handle
  const seeDetailHandel = (hotelId) => {
    navigate(`../detail/${hotelId}`, { state: location.state });
    // window.open(`/detail/${hotelId}`, "_blank");
  };

  return (
    <div className={styles.search_item}>
      {/* Phần hình ảnh */}
      <div
        style={{
          backgroundImage: `url(${
            props.item.photos[0] || "../images/new_city_img/no_image.jpg"
          })`,
        }}
        className={styles.search_item_image}
      ></div>

      {/* Phần nội dung */}
      <div className={styles.search_item_content}>
        <h1>{props.item.name}</h1>
        <p className={styles.search_item_content_distance}>
          {props.item.distance}m from center{" "}
          <span>
            <i className="fa-sharp fa-solid fa-location-dot" />
            {props.item.city}
          </span>
        </p>
        <p className={styles.search_item_content_tag}>{props.item.address}</p>
        <p className={styles.search_item_content_description}>
          {props.item.desc}
        </p>
        <p className={styles.search_item_content_type}>
          {props.item.type.toUpperCase()}
        </p>
        <h4>
          {props.item.featured ? "Free cancelletion" : "No free cancelletion"}
        </h4>
        <h5>{"You can cancel later, so lock in this great price today!"}</h5>
      </div>

      {/* Phần giá */}
      <div className={styles.search_item_content_price}>
        {/* Phần rate */}
        <div className={styles.search_item_content_rate}>
          <span>{props.item.rating == 5 ? `Excellent` : `Exceptional`}</span>
          <span className={styles.rate_highlight}>
            {props.item.rating.toFixed(1)}
          </span>
        </div>

        {/* Phần nút see detail */}
        <h1>${props.item.cheapestPrice}</h1>
        <p>Includes taxes and fees</p>
        <button onClick={() => seeDetailHandel(props.item._id)}>
          See availability
        </button>
      </div>
    </div>
  );
}
