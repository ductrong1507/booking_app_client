import React from "react";
import styles from "./SearchList.module.css";
import SearchListItem from "./SearchListItem";
import { useSelector } from "react-redux";

export default function SearchList() {
  const { searchListArr } = useSelector((state) => state.hotelReducer);

  const renderSearchList = () => {
    if (!searchListArr || searchListArr.length == 0) {
      return <p>No search result here! </p>;
    }
    return searchListArr.map((item, index) => {
      return <SearchListItem key={index} item={item} />;
    });
  };

  return (
    <section id={styles.search_list}>
      {}
      {renderSearchList()}
    </section>
  );
}
