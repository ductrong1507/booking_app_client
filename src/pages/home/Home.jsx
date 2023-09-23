import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import FormSubscribe from "../../components/FormSubscribe/FormSubscribe";
import Footer from "../../components/Footer/Footer";
import CityList from "../../components/CityList/CityList";
import HotelTypes from "../../components/HotelType/HotelTypes";
import HotelList from "../../components/HotelList/HotelList";
import styles from "./Home.module.css";
import { API_BASE_URL } from "../../utils/apiConfig";

const Home = (props) => {
  const [homePageData, setHomePageData] = useState();

  useEffect(() => {
    fetchApiHomepage();
  }, []);

  // Call API thông tin trang chủ
  const fetchApiHomepage = async () => {
    try {
      const apiInfo = await axios({
        url: `${API_BASE_URL}/api/hotel/homepage`,
        method: "GET",
      });
      setHomePageData(apiInfo.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="main">
      {homePageData ? (
        <>
          {/* Phần header form */}
          <div style={{ backgroundColor: "#003580" }}>
            <Header />
          </div>

          {/* Phần content của homepage*/}
          <div id={styles.home_content}>
            <CityList hoteListArea={homePageData.hoteListArea} />
            <HotelTypes hoteListType={homePageData.hoteListTypeAmount} />
            <HotelList hoteListArea={homePageData.hoteListArea.slice(0, 3)} />
          </div>

          {/* Phần footer và form Subscribe */}
          <div style={{ backgroundColor: "#003580" }}>
            <FormSubscribe />
          </div>

          <Footer />
        </>
      ) : (
        <p className={styles.loading}>Loading</p>
      )}
    </section>
  );
};

export default Home;
