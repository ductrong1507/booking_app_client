import React from "react";
import styles from "./HotelTypes.module.css";

const typeListBase = [
  {
    name: "Hotel",
    count: 0,
    image: "./images/type_1.webp",
  },
  {
    name: "Apartment",
    count: 0,
    image: "./images/type_2.jpg",
  },
  {
    name: "Resort",
    count: 0,
    image: "./images/type_3.jpg",
  },
  {
    name: "Villa",
    count: 0,
    image: "./images/type_4.jpg",
  },
  {
    name: "Cabin",
    count: 0,
    image: "./images/type_5.jpg",
  },
];

export default function HotelTypes(props) {
  // xử lý dữ liệu trước khi render
  const newTypeList = typeListBase.map((item) => {
    const index = props.hoteListType.findIndex(
      (ele) => ele._id.toLowerCase() == item.name.toLowerCase()
    );
    if (index !== -1) {
      return {
        ...item,
        count: props.hoteListType[index].count,
      };
    }
    return item;
  });

  const renderHotelTypesList = () => {
    return newTypeList.map((type, index) => {
      return (
        <div key={index} className={styles.hotel_type_item}>
          <img src={type.image} />
          <h3>{`${type.name}s`}</h3>
          <p>{`${type.count} ${type.name.toLowerCase()}s`}</p>
        </div>
      );
    });
  };

  return (
    <div className={styles.hotel_type_container}>
      <h1>Brower by property type</h1>

      <div className={styles.hotel_type_list}>{renderHotelTypesList()}</div>
    </div>
  );
}
