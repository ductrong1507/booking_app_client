import React from "react";
import styles from "./CityList.module.css";

export default function CityList(props) {
  const renderListCitys = () => {
    // Xử lý dữ liệu đầu vào
    let newObj = {
      "Ho Chi Minh": 0,
      "Ha Noi": 0,
      "Da Nang": 0,
    };

    for (let i = 0; i < props.hoteListArea.length; i++) {
      // const keyName = props.hoteListArea[i].city;
      if (
        props.hoteListArea[i].city.toLowerCase() == "Ho Chi Minh".toLowerCase()
      ) {
        newObj["Ho Chi Minh"] += 1;
      } else if (
        props.hoteListArea[i].city.toLowerCase() == "Ha Noi".toLowerCase()
      ) {
        newObj["Ha Noi"] += 1;
      } else if (
        props.hoteListArea[i].city.toLowerCase() == "Da Nang".toLowerCase()
      ) {
        newObj["Da Nang"] += 1;
      }
    }

    // xử lý Obj trên thành mảng để render
    let img = "";
    const resultCity = Object.entries(newObj).map((item) => {
      if (item[0] == "Ho Chi Minh") {
        img = `./images/new_city_img/HCM.jpg`;
      } else if (item[0] == "Ha Noi") {
        img = `./images/new_city_img/Ha_Noi.jpg`;
      } else {
        img = `./images/new_city_img/Da_Nang.jpg`;
      }
      return {
        name: item[0],
        amount: item[1],
        image: img,
      };
    });

    return resultCity.map((city, index) => {
      return (
        <div
          key={index}
          style={{ backgroundImage: `url(${city.image})` }}
          className={styles.city_item}
        >
          <div className={styles.city_item_content}>
            <h2>{city.name}</h2>
            <p>{`${city.amount} properties`}</p>
          </div>
        </div>
      );
    });
  };

  return <div id={styles.city_list}>{renderListCitys()}</div>;
}
