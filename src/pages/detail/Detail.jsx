import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../utils/apiConfig";
import OrderPage from "../OrderPage/OrderPage";

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const Detail = (props) => {
  const [hotelData, setHotelData] = useState(null);
  const [isReserve, setIsReserve] = useState(false);
  const location = useLocation();

  const { id } = useParams();

  useEffect(() => {
    const startAPI = location.state ? location.state.dateStart : today;
    const endAPI = location.state ? location.state.dateEnd : tomorrow;

    fecthAPIHotelDetail(startAPI, endAPI);
  }, []);

  //call API để lấy dữ chi tiết ks
  const fecthAPIHotelDetail = async (start, end) => {
    try {
      const apiInfo = await axios({
        url: `${API_BASE_URL}/api/hotel/search-info`,
        method: "POST",
        data: {
          dateStart: start,
          dateEnd: end,
          hotelId: id,
        },
      });
      setHotelData(apiInfo.data.result.hotelInfo);
    } catch (error) {
      console.log(error);
    }
  };

  // render hình ảnh
  const renderImage = () => {
    if (!hotelData) return;
    if (hotelData.photos.length == 0) {
      return (
        <div
          style={{
            backgroundImage: `url(../images/new_city_img/no_image.jpg)`,
          }}
          className={styles.detail_content_image_item}
        ></div>
      );
    } else {
      return hotelData.photos.map((img, index) => {
        return (
          <div
            key={index}
            style={{ backgroundImage: `url(${img})` }}
            className={styles.detail_content_image_item}
          ></div>
        );
      });
    }
  };

  // Handel nút Reserve or Book Now!
  const bookButtonHandle = () => {
    setIsReserve(!isReserve);
  };

  return (
    <section id="detail">
      {hotelData ? (
        <div className={styles.detail_content}>
          {/* Detail thông tin địa chỉ */}
          <div className={styles.detail_content_place}>
            <div className={styles.detail_content_place_info}>
              <h1>{hotelData.name}</h1>
              <p>
                <i className="fa-sharp fa-solid fa-location-dot" />
                {hotelData.address}
              </p>
              <h4 className={styles.detail_primary_color}>
                {`Excellent location - ${hotelData.distance}m from center`}
              </h4>
              <h4 className={styles.detail_secondary_color}>
                {`Book a stay over $${
                  hotelData.cheapestPrice * 2
                } at this property and get a free airport taxi`}
              </h4>
            </div>
          </div>

          {/* Detail thông tin hình ảnh */}
          <div className={styles.detail_content_image}>{renderImage()}</div>

          {/* Detail thông tin miêu tả */}
          <div className={styles.detail_content_info}>
            {/* Detail tên + mô tả */}
            <div className={styles.detail_content_info_specific}>
              <h1>{hotelData.title}</h1>
              <p>{hotelData.desc}</p>
            </div>

            {/* Detail nút Reserve */}

            <div className={styles.detail_content_info_deal}>
              <h4>
                <strong>${hotelData.cheapestPrice}</strong> (1 night)
              </h4>
              <button onClick={bookButtonHandle} className={styles.detail_btn}>
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading</p>
      )}
      {isReserve && (
        <OrderPage
          fecthAPIHotelDetail={fecthAPIHotelDetail}
          hotelData={hotelData}
          searchOption={location.state || { today, tomorrow }}
        />
      )}
    </section>
  );
};

export default Detail;
